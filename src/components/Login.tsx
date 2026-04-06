import { useState } from "react";
import { signIn } from "../api/auth";

type LoginProps = {
  onSwitch: () => void;
  onForgot: () => void;
};

export default function Login({ onSwitch, onForgot }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault(); // prevent page reload
    try {
      setError(null);
      await signIn(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold">Login</h2>

        <input
          className="w-full p-2 rounded bg-zinc-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 rounded bg-zinc-800"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded"
        >
          Login
        </button>

        <p
          className="text-sm text-zinc-400 cursor-pointer"
          onClick={onSwitch}
        >
          Don't have an account? Sign up
        </p>

        <button
          type="button"
          onClick={onForgot}
          className="text-sm text-blue-400 cursor-pointer hover:underline"
        >
          Forgot password?
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}