import type { Movie } from "../api/movies";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 text-center">
      
      <div className="overflow-hidden rounded-xl">
        <img
          src={movie.Poster}
          alt={movie.Title}
          width="150"
          className="mx-auto rounded-lg object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h3 className="mt-4 text-white text-lg font-semibold line-clamp-1">
        {movie.Title}
      </h3>

      <p className="text-sm text-zinc-400 mt-1">
        {movie.Year}
      </p>
    </div>
  );
}