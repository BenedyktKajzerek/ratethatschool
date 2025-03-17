"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../../../../firebaseConfig";
import { signInWithEmail } from "@/utils/auth";

const FinishSignIn = () => {
  const router = useRouter();

  useEffect(() => {
    const completeSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem("emailForSignIn");

        if (!email) {
          email = window.prompt("Please enter your email:");
        }

        if (email) {
          try {
            await signInWithEmail(email, window.location.href);
            localStorage.removeItem("emailForSignIn");
            router.push("/"); // Redirect to home or dashboard
          } catch (error) {
            console.error("Sign-in failed:", error);
          }
        }
      }
    };

    completeSignIn();
  }, [router]);

  return <p>Finishing sign-in...</p>;
};

export default FinishSignIn;
