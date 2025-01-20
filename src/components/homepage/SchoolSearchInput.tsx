"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const SchoolSearchInput: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close displaying school when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-[760px] text-black"
      ref={containerRef}
    >
      <input
        onFocus={() => {
          setIsActive(true);
        }}
        type="text"
        aria-label="School Search Input"
        placeholder="Search for your school"
        className={`w-full ${isActive ? "rounded-t-lg" : "rounded-lg"} px-6 py-3 outline-none`}
      />
      <div
        className={`${isActive ? "flex" : "hidden"} absolute w-full flex-col rounded-b-lg bg-white`}
      >
        <Link
          href="link-to-first-school"
          className="border-gray border-t px-4 py-2"
        >
          <span>First School</span>
          <span className="ml-2 text-xs">Poland, Mysłowice</span>
        </Link>
        <Link
          href="link-to-second-school"
          className="border-gray border-t px-4 py-2"
        >
          <span>Second School</span>
          <span className="ml-2 text-xs">Hungary, Budapest</span>
        </Link>
        <Link
          href="link-to-third-school"
          className="border-gray border-t px-4 py-2"
        >
          <span>Third School</span>
          <span className="ml-2 text-xs">USA, New York</span>
        </Link>
        <div className="border-gray space-x-4 rounded-b-lg border-t bg-gray-100 px-4 py-2 text-sm text-link">
          <Link href="/add-city">Add Your City</Link>
          <Link href="/all-schools">View All Schools</Link>
        </div>
      </div>
    </div>
  );
};
