"use client";

import { loginUser, registerUser } from "@/utils/auth";
import { validateEmail, validatePassword } from "@/utils/authValidation";
import React, { useState } from "react";

interface ModalAuthProps {
  isOpen: boolean;
  onClose: () => void;
  isSignUp: boolean;
  toggleAuthMode: () => void; // toggles isSignUp in parent component
}

export const ModalAuth: React.FC<ModalAuthProps> = ({
  isOpen,
  onClose,
  isSignUp,
  toggleAuthMode,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleAuthAction = async () => {
    setValidationError(null); // Clear previous errors

    // Email validation
    if (!validateEmail(email)) {
      setValidationError("Invalid email address");
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      setValidationError(
        "Password must have at least 8 characters, a capital letter, a lowercase letter, a number, and a special character.",
      );
      return;
    }

    // Register or log in user
    try {
      if (isSignUp) {
        await registerUser(email, password);
        console.log("Signed up successfully");
      } else {
        await loginUser(email, password);
        console.log("Logged in successfully");
      }
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-80 rounded-md bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">
            {isSignUp ? "Sign Up" : "Log in"}
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input mb-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input mb-4"
          />

          {/* Validation error message */}
          {validationError && (
            <p className="mb-2 text-sm text-red-500">{validationError}</p>
          )}

          <button onClick={handleAuthAction} className="btn mb-2 w-full">
            {isSignUp ? "Sign Up" : "Login"}
          </button>

          {/* Switch between log-in and sign-up modals*/}
          <p>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={toggleAuthMode}
              className="text-blue-600 underline"
            >
              {isSignUp ? "Log in" : "Sign up"}
            </button>
          </p>

          <button onClick={onClose} className="btn-secondary w-full">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
