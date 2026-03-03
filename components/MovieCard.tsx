import { Calendar, Star, Users } from "lucide-react";

type Props = { movie: any };

export default function MovieCard({ movie }: Props) {
  const cast = (movie.Actors || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-5 md:p-6 backdrop-blur">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-[220px]">
          <div className="absolute -inset-2 rounded-3xl bg-white/5 blur-xl" />
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
            alt={movie.Title}
            className="relative w-full md:w-[220px] rounded-2xl border border-white/10"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl md:text-3xl font-semibold">
              {movie.Title}
            </h2>
            <p className="text-white/65">{movie.Genre}</p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-black/30 p-4 border border-white/10">
              <div className="text-white/60 text-xs flex items-center gap-2">
                <Calendar size={14} /> Release
              </div>
              <div className="mt-1 font-semibold">{movie.Year}</div>
            </div>

            <div className="rounded-2xl bg-black/30 p-4 border border-white/10">
              <div className="text-white/60 text-xs flex items-center gap-2">
                <Star size={14} /> IMDb
              </div>
              <div className="mt-1 font-semibold">{movie.imdbRating}</div>
            </div>

            <div className="rounded-2xl bg-black/30 p-4 border border-white/10">
              <div className="text-white/60 text-xs flex items-center gap-2">
                <Users size={14} /> Votes
              </div>
              <div className="mt-1 font-semibold">{movie.imdbVotes}</div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-white/60 text-sm">Plot</div>
            <p className="mt-2 text-white/85 leading-relaxed">{movie.Plot}</p>
          </div>

          <div className="mt-5">
            <div className="text-white/60 text-sm">Cast</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {cast.slice(0, 12).map((name: string, i: number) => (
                <span
                  key={`${name}-${i}`}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/80"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
