import { MessageSquareText, Sparkles, Star } from "lucide-react";

type Props = {
  ai: {
    summary: string;
    classification: "positive" | "mixed" | "negative";
    highlights: string[];
  };
  imdbRating: string; // 👈 pass from MovieCard parent
};

const badgeStyle = (c: string) => {
  if (c === "positive")
    return "bg-emerald-500/15 border-emerald-400/30 text-emerald-200";
  if (c === "negative")
    return "bg-rose-500/15 border-rose-400/30 text-rose-200";
  return "bg-amber-500/15 border-amber-400/30 text-amber-200";
};

const getRecommendationFromRating = (rating: string) => {
  const num = parseFloat(rating);

  if (isNaN(num)) return "Rating not available.";

  if (num >= 8)
    return "Highly recommended. This movie is a must-watch based on its strong IMDb rating.";

  if (num >= 6.5)
    return "Good to watch. Audiences generally rate this movie positively.";

  if (num >= 5) return "Average movie. It may appeal to specific viewers.";

  return "Not recommended. The IMDb rating suggests weak audience reception.";
};

export default function ReviewSummary({ ai, imdbRating }: Props) {
  const cls = ai?.classification || "mixed";

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white/60 text-sm flex items-center gap-2">
            <Sparkles size={16} />
            Audience Sentiment (AI)
          </div>

          <h3 className="mt-1 text-2xl font-semibold">Insight Summary</h3>
        </div>

        {/* Sentiment Badge */}
        <span
          className={`px-3 py-1.5 rounded-full border text-sm font-medium ${badgeStyle(
            cls,
          )}`}
        >
          {String(cls).toUpperCase()}
        </span>
      </div>

      {/* AI Summary */}
      <div className="mt-5 rounded-2xl bg-black/30 border border-white/10 p-4">
        <div className="text-white/60 text-xs flex items-center gap-2">
          <MessageSquareText size={14} />
          AI Summary About the Movie
        </div>

        <p className="mt-2 text-white/85 leading-relaxed">{ai.summary}</p>
      </div>

      {/* IMDb Based Recommendation */}
      <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="text-white/60 text-sm flex items-center gap-2">
          <Star size={14} />
          Final Recommendation (Based on IMDb Rating)
        </div>

        <p className="mt-1 text-white font-medium">
          {getRecommendationFromRating(imdbRating)}
        </p>
      </div>

      {/* Highlights */}
      {Array.isArray(ai.highlights) && ai.highlights.length > 0 && (
        <div className="mt-5">
          <div className="text-white/60 text-sm mb-2">Highlights</div>

          <div className="grid sm:grid-cols-2 gap-3">
            {ai.highlights.map((h, index) => (
              <div
                key={index}
                className="rounded-2xl bg-black/30 border border-white/10 p-4 text-white/85"
              >
                • {h}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
