"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Search,
  Sparkles,
  Star,
  Users,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import MovieCard from "@/components/MovieCard";
import ReviewSummary from "@/components/ReviewSummary";

const demoReviews = [
  "Amazing visuals and a mind-bending story. Kept me hooked.",
  "Great action scenes and iconic soundtrack, but a bit confusing at times.",
  "Loved the concept and the pacing. Performances were strong.",
  "Some parts felt slow, but overall it was worth watching.",
  "The plot is smart and the world-building is excellent.",
];

function Skeleton() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="h-6 w-56 bg-white/10 rounded-lg animate-pulse" />
      <div className="mt-4 h-4 w-96 bg-white/10 rounded-lg animate-pulse" />
      <div className="mt-6 flex gap-4">
        <div className="h-40 w-28 bg-white/10 rounded-2xl animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-72 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-4 w-52 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-4 w-full bg-white/10 rounded-lg animate-pulse" />
          <div className="h-4 w-11/12 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-4 w-10/12 bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [imdbId, setImdbId] = useState("");
  const [movie, setMovie] = useState<any>(null);
  const [ai, setAi] = useState<any>(null);
  const [reviews, setReviews] = useState<string[]>([]);
  const [userReview, setUserReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingReview, setSendingReview] = useState(false);

  const valid = useMemo(() => /^tt\d{7,8}$/.test(imdbId.trim()), [imdbId]);

  const run = async () => {
    setLoading(true);
    setAi(null);
    setMovie(null);
    setReviews([]);
    setUserReview("");

    const id = imdbId.trim();

    const m = await fetch(`/api/movie?id=${encodeURIComponent(id)}`).then((r) =>
      r.json(),
    );
    setMovie(m);

    if (m?.Response === "True") {
      const reviewsRes = await fetch(
        `/api/reviews?id=${encodeURIComponent(id)}`,
      );
      const realReviews = reviewsRes.ok ? await reviewsRes.json() : [];

      const safeReviews =
        Array.isArray(realReviews) && realReviews.length > 0
          ? realReviews
          : demoReviews;

      setReviews(safeReviews);

      const sentiRes = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews: safeReviews }),
      });
      const s = sentiRes.ok ? await sentiRes.json() : null;
      setAi(s);

      setAi(s);
    }

    setLoading(false);
  };

  const submitReview = async () => {
    const text = userReview.trim();
    if (!text) return;

    setSendingReview(true);

    const updatedReviews = [text, ...reviews];
    setReviews(updatedReviews);
    setUserReview("");

    // Update AI sentiment with the new reviews list
    const s = await fetch("/api/sentiment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviews: updatedReviews }),
    }).then((r) => r.json());

    setAi(s);
    setSendingReview(false);
  };

  return (
    <main className="min-h-screen text-white overflow-hidden">
      {/* Premium background */}
      <div className="fixed inset-0 -z-10 bg-[#050507]" />
      <div className="fixed inset-0 -z-10 opacity-70">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-40 -right-40 h-[620px] w-[620px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-3"
        >
          <div className="inline-flex items-center gap-2 text-white/80">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
              <Film size={18} />
            </span>
            <span className="text-sm tracking-wide">
              AI Movie Insight Builder
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            AI Movie Insight <span className="text-white/70">Builder</span>
          </h1>

          <p className="text-white/70 max-w-2xl">
            Enter an IMDb ID (example:{" "}
            <span className="font-semibold text-white/85">tt0133093</span>) to
            fetch movie details, show audience reviews, and generate sentiment
            insights using AI.
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur"
        >
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex-1">
              <label className="text-sm text-white/60">IMDb Movie ID</label>

              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45">
                  <Search size={18} />
                </span>

                <input
                  value={imdbId}
                  onChange={(e) => setImdbId(e.target.value)}
                  placeholder="tt0133093"
                  className="w-full rounded-2xl bg-black/35 border border-white/10 px-10 py-4 outline-none
                             focus:border-white/20 focus:bg-black/45 transition"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">
                    tt + 7–8 digits
                  </span>
                </span>
              </div>

              {!valid && imdbId.length > 0 && (
                <p className="mt-2 text-sm text-white/55">
                  Invalid format. Example:{" "}
                  <span className="font-semibold">tt0133093</span>
                </p>
              )}
            </div>

            <button
              onClick={run}
              disabled={!valid || loading}
              className="rounded-2xl px-6 py-4 bg-white text-black font-semibold
                         disabled:opacity-40 transition active:scale-[0.99]
                         inline-flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              {loading ? "Building..." : "Build Insights"}
            </button>
          </div>

          {/* Feature chips */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Star size={14} /> Rating & Year
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Users size={14} /> Cast list
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <MessageSquareText size={14} /> Reviews + AI sentiment
            </span>
          </div>
        </motion.div>

        {/* Results */}
        <div className="mt-8 grid gap-6">
          {loading && (
            <>
              <Skeleton />
              <Skeleton />
            </>
          )}

          <AnimatePresence>
            {!loading && movie?.Response === "True" && (
              <motion.div
                key="movie"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            )}

            {!loading && ai && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35, delay: 0.02 }}
              >
                <ReviewSummary ai={ai} imdbRating={movie.imdbRating} />
              </motion.div>
            )}

            {!loading && movie?.Response === "True" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35, delay: 0.03 }}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur"
              >
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <MessageSquareText size={16} />
                  <span>Audience Reviews</span>
                </div>

                <h3 className="mt-1 text-2xl font-semibold">Add your review</h3>

                {/* Write review */}
                <div className="mt-4 flex flex-col gap-3">
                  <textarea
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full rounded-2xl bg-black/30 border border-white/10 p-4 text-white outline-none
                               focus:border-white/20 transition"
                    rows={3}
                  />

                  <button
                    onClick={submitReview}
                    disabled={sendingReview || userReview.trim().length === 0}
                    className="self-start rounded-2xl px-4 py-2 bg-white text-black font-semibold
                               disabled:opacity-40 inline-flex items-center gap-2"
                  >
                    <SendHorizonal size={16} />
                    {sendingReview ? "Submitting..." : "Submit Review"}
                  </button>
                </div>

                {/* Show reviews */}
                <div className="mt-6 space-y-4">
                  {reviews.length === 0 ? (
                    <div className="text-white/60">No reviews available.</div>
                  ) : (
                    reviews.map((review, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl bg-black/30 border border-white/10 text-white/85"
                      >
                        {review.length > 450
                          ? review.slice(0, 450) + "..."
                          : review}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {!loading && movie?.Response === "False" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="text-lg font-semibold">Movie not found</div>
                <div className="text-white/70 mt-1">{movie?.Error}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
