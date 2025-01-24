"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllSchools } from "@/utils/getAllSchools";

export default function AllSchools() {
  const [groupedSchools, setGroupedSchools] = useState<
    Record<string, Record<string, string[]>>
  >({});
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
          {Object.entries(groupedSchools).map(([countryName, cities]) => (
            <div key={countryName} className="space-y-1">
              <h3 className="text-xl font-medium">{countryName} Schools</h3>
              {Object.entries(cities).map(([cityName, schoolNames]) => (
                <div key={cityName} className="ml-4">
                  <h4 className="capitalize underline">{cityName}</h4>
                  <ul>
                    {schoolNames.map((schoolName) => (
                      <li key={schoolName} className="ml-4">
                        <Link
                          href={`reviews/${schoolName}`}
                          className="capitalize hover:underline"
                        >
                          {schoolName}
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
