"use client";

import Link from "next/link";
import React, { useState } from "react";

export const SchoolSearchInput: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[760px] text-black">
      <input
        onFocus={() => {
          setIsActive(true);
        }}
        onBlur={() => {
          setIsActive(false);
        }}
        type="text"
        name=""
        id=""
        aria-label="School Search Input"
        placeholder="Search for your school"
        className={`w-full ${isActive ? "rounded-t-lg" : "rounded-lg"} px-6 py-3 outline-none`}
      />
      <div
        className={`${isActive ? "flex" : "hidden"} absolute w-full flex-col rounded-b-lg bg-white`}
      >
        <Link
          href={"link-to-first-school"}
          className="border-gray border-t px-4 py-2"
        >
          <span>First School</span>
          <span className="ml-2 text-xs">Poland, Mysłowice</span>
        </Link>
        <Link
          href={"link-to-second-school"}
          className="border-gray border-t px-4 py-2"
        >
          <span>Second School</span>
          <span className="ml-2 text-xs">Hungary, Budapest</span>
        </Link>
        <Link
          href={"link-to-third-school"}
          className="border-gray border-t px-4 py-2"
        >
          <span>Third School</span>
          <span className="ml-2 text-xs">USA, New York</span>
        </Link>
        <div className="border-gray space-x-4 rounded-b-lg border-t bg-gray-100 px-4 py-2 text-sm text-link">
          <Link href={"/add-school"}>Add Your School</Link>
          <Link href={"/all-schools"}>View All Schools</Link>
        </div>
      </div>
    </div>
  );
};
