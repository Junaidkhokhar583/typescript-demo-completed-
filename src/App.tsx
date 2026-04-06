import { useEffect, useState } from "react"
import { searchMovies, type Movie } from "./api/movies"
import MovieCard from "./components/MovieCard"
import { supabase } from "./lib/supabase"
import Login from "./components/Login"
import Signup from "./components/Signup"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword";


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("batman");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<unknown>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);


  async function handleLogout() {
  await supabase.auth.signOut();
  setSession(null);       
  setMovies([]);          
}

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
  if (
    window.location.pathname === "/reset-password" &&
    window.location.hash.includes("access_token")
  ) {
    setIsResetMode(true);
  }

  supabase.auth.getSession().then(({ data }) => {
    setSession(data.session);
  });

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return () => listener.subscription.unsubscribe();
}, []);

useEffect(() => {
  if (session) {
    loadMovies();
  }
}, [session]);


if (isResetMode) {
  return <ResetPassword onBack={() => setShowForgot(false)} />;
}


 if (!session) {
  if (showForgot) {
    return <ForgotPassword onBack={() => setShowForgot(false)} />;
  }

  return showSignup ? (
    <Signup onSwitch={() => setShowSignup(false)} />
  ) : (
    <Login
      onSwitch={() => setShowSignup(true)}
      onForgot={() => setShowForgot(true)}
    />
  );
}


  return (
    <>
      <div className="p-10 max-w-6xl mx-auto">
  <h1 className="text-3xl font-bold text-white mb-6">Movie Search</h1>

  
  <div className="flex items-center gap-3 mb-6">
    <input
      className="flex-1 bg-zinc-900 text-white placeholder-zinc-400 px-4 py-2.5 rounded-xl outline-none border border-zinc-700 focus:border-white focus:ring-1 focus:ring-white transition"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
       onKeyDown={(e) => {
    if (e.key === "Enter") {
      loadMovies();
    }
  }}
      placeholder="Search movies..."
    />

    <button
      onClick={loadMovies}
      className="bg-white text-black px-5 py-2.5 rounded-xl font-medium hover:bg-zinc-200 transition"
    >
      Search
    </button>
    <button
    onClick={handleLogout}
    className="absolute top-10 right-10 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
  >
    Logout
  </button>
  </div>

  {loading && <p className="text-zinc-400">Loading...</p>}
  {error && <p className="text-red-500">{error}</p>}

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {movies.map((m) => (
      <MovieCard key={m.imdbId} movie={m} />
    ))}
  </div>
</div>
    </>
  )
}

export default App;
