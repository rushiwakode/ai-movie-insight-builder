import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = (searchParams.get("id") || "").trim();

  if (!id) {
    return NextResponse.json(
      { Response: "False", Error: "Missing IMDb ID" },
      { status: 400 },
    );
  }

  const res = await fetch(
    `https://www.omdbapi.com/?i=${encodeURIComponent(id)}&apikey=${process.env.OMDB_API_KEY}`,
    { cache: "no-store" },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
