import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleEmailSignUp} className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Sign Up</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          required
        />
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold mb-4">Sign Up</button>
        <button type="button" onClick={handleGoogleSignUp} className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold">Sign up with Google</button>
        <div className="mt-4 text-gray-400 text-sm text-center">
          Already have an account? <a href="/sign-in" className="text-indigo-400 hover:underline">Sign In</a>
        </div>
      </form>
    </div>
  );
}
// This component renders the Clerk SignUp component, which handles user registration.