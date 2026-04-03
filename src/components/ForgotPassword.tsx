import { useState } from "react";
import { forgotPassword } from "../api/auth";

export default function ForgotPassword({ onBack }:{onBack:()=>void}) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function handleReset() {
    try {
      await forgotPassword(email);
      setMsg("Check your email for reset link");
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Reset Password</h2>

        <input
          className="w-full p-2 rounded bg-zinc-800"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-white text-black py-2 rounded"
        >
          Send Reset Link
        </button>

        {msg && <p className="text-green-400">{msg}</p>}
        <button
          onClick={onBack}
          className="text-sm text-blue-400 cursor-pointer hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}