"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FinishSignIn = () => {
  const router = useRouter();
  const [message, setMessage] = useState("Processing your sign-in...");

  useEffect(() => {
    const completeSignIn = async () => {
      try {
        const email = window.localStorage.getItem("emailForSignIn");

        if (!email) {
          setMessage("No email found for sign-in. Please try again.");
          return;
        }

        setMessage("Sign-in successful! Redirecting...");
        router.push("/"); // Redirect to your home page or dashboard
      } catch (error) {
        console.error("Error completing sign-in:", error);
        setMessage("Failed to sign in. Please try again.");
      }
    };

    completeSignIn();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default FinishSignIn;
