"use client";

import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../firebaseConfig";

interface School {
  name: string;
  slug: string;
  country: { name: string; slug: string };
  city: { name: string; slug: string };
}

export const SchoolSearchInput: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [allSchools, setAllSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);

  async function fetchSchools() {
    if (allSchools.length === 0) {
      const schoolsSnap = await getDocs(query(collection(db, "schools")));
      const data = schoolsSnap.docs.map((doc) => doc.data() as School); // Explicitly cast Firestore data to `School`
      setAllSchools(data);
      setFilteredSchools(data);
    }
  }

  const handleSchoolSearch = (value: string) => {
    if (value.trim() === "") {
      setFilteredSchools(allSchools);
    } else {
      setFilteredSchools(
        allSchools.filter((school) =>
          school.name.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }
  };

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
        onChange={(e) => {
          handleSchoolSearch(e.target.value);
        }}
        type="text"
        aria-label="School Search Input"
        placeholder="Search for your school"
        className={`w-full ${isActive ? "rounded-t-lg" : "rounded-lg"} px-6 py-3 outline-none`}
      />
      <div
        className={`${isActive ? "flex" : "hidden"} absolute max-h-[164px] w-full flex-col overflow-y-scroll rounded-b-lg bg-white`}
      >
        {filteredSchools.map((school) => {
          const { name, slug, country, city } = school;

          return (
            <Link
              key={slug}
              href={`reviews/${country.slug}/${city.slug}/${slug}`}
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
          <Link href="/add-school">Add Your City</Link>
          <Link href="/all-schools">View All Schools</Link>
        </div>
      </div>
    </div>
  );
};
