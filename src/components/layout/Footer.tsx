import Link from "next/link";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="overflow-x-hidden bg-background text-black">
      <div className="flex flex-col items-center space-y-4 p-8 sm:p-16">
        <div className="mb-5">
          <Link href="/" className="text-4xl font-bold sm:text-5xl">
            RateMy<span className="text-primary">Schools</span>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center space-x-6">
          <Link href="/blog" className="mb-2 hover:underline sm:mb-0">
            Blog
          </Link>
          <Link href="/all-schools" className="mb-2 hover:underline sm:mb-0">
            All Schools
          </Link>
          <Link href="/about" className="mb-2 hover:underline sm:mb-0">
            About
          </Link>
        </div>

        <div className="flex flex-wrap justify-center space-x-1 text-xs">
          <Link
            href="/terms-and-conditions"
            className="mb-2 hover:text-gray-500 sm:mb-0"
          >
            Terms & Conditions
          </Link>

          <span>•</span>

          <Link
            href="/privacy-policy"
            className="mb-2 hover:text-gray-500 sm:mb-0"
          >
            Privacy Policy
          </Link>

          <span>•</span>

          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};
