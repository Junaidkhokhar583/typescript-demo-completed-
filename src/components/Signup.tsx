import { useState } from "react";
import { signUp } from "../api/auth";

export default function Signup({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup() {
    try {
      await signUp(email, password);
      setMessage("Check your email to confirm signup!");
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Sign Up</h2>

        <input
          className="w-full p-2 rounded bg-zinc-800"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 rounded bg-zinc-800"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSignup();
            }
          }}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-white text-black py-2 rounded"
        >
          Sign Up
        </button>

        <p
          className="text-sm text-zinc-400 cursor-pointer"
          onClick={onSwitch}
        >
          Already have an account? Login
        </p>

        {message && <p className="text-green-400">{message}</p>}
      </div>
    </div>
  );
}