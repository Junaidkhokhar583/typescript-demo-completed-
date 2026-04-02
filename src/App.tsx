import { useEffect, useState } from "react"
import { searchMovies, type Movie } from "./api/movies"
import MovieCard from "./components/MovieCard"


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("batman");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  async function loadMovies() {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(query);
      setMovies(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    loadMovies();
  }, [])

  return (
    <>
      <div className="p-20">
        <h1>Movie Search</h1>
        <input
        className="border border-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Movies..."
        />
        <button onClick={loadMovies}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="grid grid-cols-4 gap-10">
          {movies.map((m) => (<MovieCard key={m.imdbId} movie={m} />))}

        </div>

      </div>
    </>
  )
}

export default App;
