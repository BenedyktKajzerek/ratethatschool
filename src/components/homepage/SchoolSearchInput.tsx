"use client";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../firebaseConfig";

export const SchoolSearchInput: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortedSchools, setSortedSchools] = useState<any[]>([]);

  // Fetch and sort all schools
  async function fetchSchools() {
    // Ensure data wasn't already fetched
    if (sortedSchools.length === 0) {
      const schoolsSnap = await getDocs(
        query(collection(db, "schools"), orderBy("name")),
      );

      let schools = schoolsSnap.docs.map((doc) => doc.data());

      schools.sort((a, b) => a.name.localeCompare(b.name));

      setSortedSchools(schools);
    }
  }

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
          fetchSchools();
        }}
        type="text"
        aria-label="School Search Input"
        placeholder="Search for your school"
        className={`w-full ${isActive ? "rounded-t-lg" : "rounded-lg"} px-6 py-3 outline-none`}
      />
      <div
        className={`${isActive ? "flex" : "hidden"} absolute max-h-[164px] w-full flex-col overflow-y-scroll rounded-b-lg bg-white`}
      >
        {sortedSchools.map((school) => {
          const { name, slug, country, city } = school;

          return (
            <Link
              key={slug}
              href={`schools/${country.slug}/${city.slug}/${slug}`}
              className="border-gray border-t px-4 py-2 hover:bg-gray-100"
            >
              <span className="capitalize">{name}</span>
              <span className="ml-2 text-xs capitalize">
                {country.name}, {city.name}
              </span>
            </Link>
          );
        })}

        <div className="border-gray space-x-4 rounded-b-lg border-t bg-gray-100 px-4 py-2 text-sm text-link">
          <Link href="/add-city">Add Your City</Link>
          <Link href="/all-schools">View All Schools</Link>
        </div>
      </div>
    </div>
  );
};
