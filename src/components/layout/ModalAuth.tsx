"use client";

// import { loginUser, registerUser } from "@/utils/auth";
import React, { useState } from "react";
import { sendEmailLink } from "@/utils/auth";
import { validateEmail } from "@/utils/authValidation";
import { Button } from "@/components/ui/Button";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

interface ModalAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAuth: React.FC<ModalAuthProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const isEmailValid = !validateEmail(email);
  const [isVerifyYourEmail, setIsVerifyYourEmail] = useState(false);

  const handleSignInWithEmailLink = async () => {
    try {
      await sendEmailLink(email);
      setIsVerifyYourEmail(true);
    } catch (error) {
      console.error("Error sending email link:", error);
    }
  };

  // const handleSignInWithGoogle = async () => {
  //   try {
  //     await signInWithGoogle();
  //     onClose();
  //   } catch (error) {
  //     console.error("Error singing in with Google:", error);
  //   }
  // };

  // const handleSignInWithFacebook = async () => {};

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative flex w-[420px] flex-col items-center space-y-4 rounded-md bg-white px-10 py-4">
          <div>
            <h2 className="text-2xl font-medium">
              {isVerifyYourEmail ? "Verify Your Email" : "Log in or Sign Up"}
            </h2>

            {/* Close btn */}
            <button
              onClick={onClose}
              className="absolute right-2 top-2 text-grey hover:text-black"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Sign in with Google/Facebook */}
          {!isVerifyYourEmail ? (
            <>
              {/* TODO add google & facebook sign up */}
              {/* <div className="w-full space-y-4">
                <button
                  onClick={handleSignInWithGoogle}
                  className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-400 p-3 hover:border-primary hover:text-primary"
                >
                  <FcGoogle size={24} />
                  <div>Google</div>
                </button>

                <button
                  onClick={handleSignInWithFacebook}
                  className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-400 p-3 hover:border-primary hover:text-primary"
                >
                  <FaFacebookSquare size={24} className="text-blue-700" />
                  <div>Facebook</div>
                </button>
              </div> */}

              {/* Divider */}
              {/* <div className="flex w-full items-center justify-center align-middle">
                <div className="h-[1px] w-full bg-gray-300"></div>
                <div className="text-grey mx-3 text-nowrap text-lg">or</div>
                <div className="h-[1px] w-full bg-gray-300"></div>
              </div> */}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-400 p-3 text-grey"
              />

              {/* Enable btn only if email is valid */}
              <Button
                onClick={handleSignInWithEmailLink}
                disabled={isEmailValid}
                className={`w-full p-3 text-base ${isEmailValid && "cursor-not-allowed bg-grey hover:bg-gray-500"}`}
              >
                Sign In
              </Button>

              {/* <button
                onClick={() => {
                }}
                className="text-link"
              >
                forgot your password?
              </button> */}

              {/* Terms and Policy */}
              <p className="text-center text-xs font-light text-gray-400">
                By signing up, I agree to the RateMySchools{" "}
                <Link
                  href="/terms-and-conditions"
                  className="text-link hover:underline"
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-link hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </>
          ) : (
            <>
              <p className="text-grey">
                Click the link in the email we sent to{" "}
                <span className="font-medium text-black">{email}</span>
              </p>
              {/* <p> Wrong address? Log out to sign in with a different email.</p> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};
