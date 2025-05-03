"use client";
import { auth } from "../../lib/firebase"; // adjust path if needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";


type AuthModalProps = {
  onClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  

  // Escape key + outside click close handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Submit handler (mock)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
  
      onClose(); // Close modal on success
    } catch (error: any) {
      alert(error.message); // You can improve this later with toast or UI message
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md p-6 rounded-xl relative shadow-lg"
      >
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>

        {/* Heading */}
        <h1 className="text-xl font-semibold mb-4 text-center">
          {mode === "login" ? "Login to Your Account" : "Create an Account"}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded-2xl"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded-2xl"
          />
          <button
            type="submit"
            className="w-full bg-blue-200 hover:bg-blue-300 rounded-2xl py-2 text-black transition"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-sm text-center mt-4">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
