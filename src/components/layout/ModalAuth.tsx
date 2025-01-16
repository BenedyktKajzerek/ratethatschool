"use client";

import { loginUser, registerUser } from "@/utils/auth";
import { validateEmail, validatePassword } from "@/utils/authValidation";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

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
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex w-[500px] flex-col items-center rounded-md bg-white px-20 py-10">
          <h2 className="text-4xl font-bold">
            {isSignUp ? "Sign Up" : "Log In"}
          </h2>

          {isSignUp && (
            <>
              <button className="mt-8 w-full rounded-3xl border border-gray-400 p-2">
                Sign up with <span className="text-yellow-500">Google</span>
              </button>

              <div className="mt-8 flex w-full items-center align-middle">
                <div className="h-[1px] w-full bg-gray-300"></div>
                <div className="mx-3 text-nowrap text-sm font-medium">
                  or sign up with email
                </div>
                <div className="h-[1px] w-full bg-gray-300"></div>
              </div>
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-8 w-full border border-gray-400 p-2 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 w-full border border-gray-400 p-2 outline-none"
          />

          {/* Validation error message */}
          {validationError && (
            <p className="mt-2 text-sm text-red-500">{validationError}</p>
          )}

          <Button onClick={handleAuthAction} className="btn mt-6">
            {isSignUp ? "Sign Up" : "Login"}
          </Button>

          {/* Switch between log-in and sign-up modals*/}
          <p className="mt-10">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button onClick={toggleAuthMode} className="text-link underline">
              {isSignUp ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
