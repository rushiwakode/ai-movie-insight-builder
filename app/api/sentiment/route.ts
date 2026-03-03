import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { reviews } = await req.json();

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return NextResponse.json({ error: "Missing reviews" }, { status: 400 });
  }

  const prompt = `
Analyze the following audience reviews.

Return JSON ONLY in this exact format:
{
  "summary": "2-4 lines summary",
  "classification": "positive" | "mixed" | "negative",
  "recommendation": "One clear sentence: good to watch / average / not recommended",
  "highlights": ["3-6 short bullet points"]
}

Rules:
- If most reviews are praising → positive + recommend good to watch
- If reviews are balanced → mixed + recommend average
- If most reviews complain → negative + recommend not recommended

Reviews:
${reviews.map((r: string, i: number) => `${i + 1}. ${r}`).join("\n")}
`;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      response_format: { type: "json_object" },
    }),
  });

  const data = await r.json();
  const content = data.choices?.[0]?.message?.content || "{}";

  return NextResponse.json(JSON.parse(content));
}
