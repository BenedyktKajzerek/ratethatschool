"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllSchools } from "@/utils/getAllSchools";
import { GroupedSchools } from "@/types/groupedSchools";

export default function AllSchools() {
  const [groupedSchools, setGroupedSchools] = useState<GroupedSchools>({});
  const [totalSchools, setTotalSchools] = useState(0);

  // Fetch and sort all schools
  useEffect(() => {
    async function fetchSchools() {
      const { groupedData, totalSchools } = await getAllSchools();

      setGroupedSchools(groupedData);
      setTotalSchools(totalSchools);
    }
    fetchSchools();
  }, []);

  return (
    <>
      <div className="flex h-52 items-center justify-center bg-gray-100 text-3xl font-medium">
        <h1>School Directory</h1>
      </div>

      <div className="mx-auto max-w-[1200px] py-8">
        {/* Number of schools already created */}
        <h2 className="text-2xl">{totalSchools} schools on RateMySchools</h2>
        <Link href="add-school" className="text-link hover:underline">
          Add your school
        </Link>

        {/* Render nested structure [countryName, cities] => [cityName, schools] => schoolName */}
        <div className="mt-6 space-y-4">
          {Object.entries(groupedSchools).map(([countrySlug, country]) => (
            <div key={countrySlug} className="space-y-1">
              <h3 className="text-xl font-medium">{country.name} Schools</h3>
              {Object.entries(country.cities).map(([citySlug, city]) => (
                <div key={citySlug} className="ml-4">
                  <Link href={`/cities/${countrySlug}/${citySlug}`}>
                    <h4 className="capitalize underline">{city.name}</h4>
                  </Link>
                  <ul>
                    {city.schools.map((school) => (
                      <li key={school.slug} className="ml-4">
                        <Link
                          href={`reviews/${countrySlug}/${citySlug}/${school.slug}`}
                          className="capitalize hover:underline"
                        >
                          {school.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
