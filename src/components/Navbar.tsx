"use client";

import { loginUser, logoutUser, registerUser } from "@/utils/auth";
import { useAuth } from "@/context/authContext";
import React, { useState } from "react";
import Link from "next/link";
import { RiTiktokLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "./ui/Button";
import { validateEmail, validatePassword } from "@/utils/authValidation";

const navbarIconSize = 24;

export default function Navbar() {
  const { user, isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login/sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleAuthAction = async () => {
    setValidationError(null); // Clear previous errors

    if (!validateEmail(email)) {
      setValidationError("Invalid email address");
      return;
    }
    if (!validatePassword(password)) {
      setValidationError(
        "Password must have at least 8 characters, a capital letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    try {
      if (isSignUp) {
        await registerUser(email, password);
        console.log("Signed up successfully");
      } else {
        await loginUser(email, password);
        console.log("Logged in successfully");
      }
      setShowModal(false); // Close modal on success
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Logged out successfully:");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <nav className="z-[100] top-0 bg-white">
        <div className="flex p-6 justify-between items-center">
          <div className="flex space-x-6">
            <Link href="https://www.instagram.com/" target="_blank">
              <FaInstagram size={navbarIconSize} />
            </Link>
            <Link href="#" target="_blank">
              <FaXTwitter size={navbarIconSize} />
            </Link>
            <Link href="#" target="_blank">
              <RiTiktokLine size={navbarIconSize} />
            </Link>
          </div>

          <Link href="#" className="font-bold text-3xl">
            RateMy<span className="text-primary">Schools</span>
          </Link>

          <div className="flex">
            {user ? (
              <>
                {isAdmin && (
                  <>
                    <Button href="/admin/dashboard" text="Dashboard" />

                    <div className="h-8 mt-1 w-px bg-zinc-200 hidden sm:block" />
                  </>
                )}
                <Button onClick={handleLogout} href="#" text="Sign out" />
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setIsSignUp(false);
                    setShowModal(true);
                  }}
                  href="#"
                  text="Log in"
                />
                <Button
                  onClick={() => {
                    setIsSignUp(true);
                    setShowModal(true);
                  }}
                  href="#"
                  text="Sign up"
                />
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-80">
            <h2 className="text-lg font-bold mb-4">
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

            {validationError && (
              <p className="text-red-500 text-sm mb-2">{validationError}</p>
            )}

            <button onClick={handleAuthAction} className="btn w-full mb-2">
              {isSignUp ? "Sign Up" : "Login"}
            </button>

            {isSignUp ? (
              <>
                Already have an account?
                <button
                  onClick={() => {
                    // Swap modal auth action
                    setIsSignUp(false);
                  }}
                  className="text-blue-600 underline"
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don't have an account?
                <button
                  onClick={() => {
                    // Swap modal auth action
                    setIsSignUp(true);
                  }}
                  className="text-blue-600 underline"
                >
                  Sign up
                </button>
              </>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="btn-secondary w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
