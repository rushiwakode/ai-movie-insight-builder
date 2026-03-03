import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const imdbId = (searchParams.get("id") || "").trim();

    if (!imdbId) return NextResponse.json([]);

    // If TMDB key not set, return empty array (frontend will fallback)
    if (!process.env.TMDB_API_KEY) {
      return NextResponse.json([]);
    }

    // Convert IMDb ID -> TMDB ID
    const findRes = await fetch(
      `https://api.themoviedb.org/3/find/${encodeURIComponent(imdbId)}?api_key=${process.env.TMDB_API_KEY}&external_source=imdb_id`,
      { cache: "no-store" },
    );

    if (!findRes.ok) return NextResponse.json([]);

    const findData = await findRes.json();
    const movieId = findData?.movie_results?.[0]?.id;
    if (!movieId) return NextResponse.json([]);

    // Fetch reviews
    const reviewRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.TMDB_API_KEY}`,
      { cache: "no-store" },
    );

    if (!reviewRes.ok) return NextResponse.json([]);

    const reviewData = await reviewRes.json();
    const reviews = (reviewData?.results || [])
      .map((r: any) => r?.content)
      .filter(Boolean)
      .slice(0, 6);

    return NextResponse.json(reviews);
  } catch {
    // Always return valid JSON
    return NextResponse.json([]);
  }
}
