import { useEffect, useState } from "react";
import { updatePassword } from "../api/auth";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession();
  }, []);

  async function handleUpdate() {
    try {
      setError("");
      setMsg("");

      await updatePassword(password);

      setMsg("Password updated successfully!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error updating password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Set New Password</h2>

        <input
          type="password"
          className="w-full p-2 rounded bg-zinc-800"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleUpdate();
          }}
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-white text-black py-2 rounded"
        >
          Update Password
        </button>

        {msg && <p className="text-green-400">{msg}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}