"use client";

import { Button } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import schoolImg from "@/../public/school-illustration-2.jpg";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { CityModel, SchoolModel } from "@/types/firestoreModels";
import schoolImg2 from "@/../public/school-classroom-illustration.jpg";
import { useParams } from "next/navigation";
import Stars from "@/components/ui/Stars";
import Link from "next/link";

export default function Reviews() {
  const params = useParams() as { countryId: string; cityId: string };
  const { countryId, cityId } = params;

  const [popularSchools, setPopularSchools] = useState<SchoolModel[]>([]);
  const [city, setCity] = useState<CityModel | null>(null);
  const [totalCityReviews, setTotalCityReviews] = useState(0);

  useEffect(() => {
    const getCity = async () => {
      const cityRef = doc(db, "cities", cityId);
      const citySnap = await getDoc(cityRef);
      if (citySnap.exists()) {
        setCity(citySnap.data() as CityModel);
      }
    };

    const getPopularSchools = async () => {
      const q = query(
        collection(db, "schools"),
        where("city.slug", "==", cityId),
      );
      const schoolsSnapshot = await getDocs(q);
      const schools = schoolsSnapshot.docs.map(
        (doc) => doc.data() as SchoolModel,
      );

      setPopularSchools(schools);
      setTotalCityReviews(
        schools.reduce((sum, school) => sum + school.reviewsCount, 0),
      );
    };

    getCity();
    getPopularSchools();
  }, [cityId]);

  return (
    <>
      {/* School background */}
      <div
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${schoolImg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex h-[300px]"
      >
        {/* School name */}
        <div className="mx-auto mb-6 flex w-[1200px] flex-col justify-end space-y-1">
          <h1 className="text-3xl capitalize text-white">
            {city?.name} Schools
          </h1>

          <p className="capitalize text-white">{city?.country.name}</p>
        </div>
      </div>

      <div className="mx-auto w-[1200px] space-y-8 py-8">
        {/* Link tree */}
        <div className="flex items-center space-x-2 text-sm">
          <TiHome size={20} />
          <p>
            <span className="capitalize">{city?.country.name}</span> {">"}{" "}
            <span className="capitalize underline">{city?.name}</span>
          </p>
        </div>

        {/* Quick note */}
        <div>
          <h3 className="text-3xl">
            Browse <span className="text-primary">{totalCityReviews}</span>{" "}
            Reviews
          </h3>
          <p className="text-sm">
            Listing {popularSchools.length} {city?.name} Schools. Click on a
            school to write a review.
          </p>
        </div>

        {/* Schools */}
        <div>
          {popularSchools.map((school) => (
            <div key={school.slug}>
              <Link
                href={`/reviews/${school.country.slug}/${school.city.slug}/${school.slug}`}
                className="flex space-x-4 rounded-md px-1 py-2 hover:cursor-pointer hover:bg-gray-100"
              >
                <div
                  style={{
                    backgroundImage: `url(${schoolImg2.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="h-20 w-20 rounded-md"
                />

                <div className="flex flex-col justify-center">
                  <p className="capitalize">{school.name}</p>

                  <div className="flex items-center space-x-2">
                    <Stars ratingOverall={school.ratingOverall} />

                    <span>{school.reviewsCount} reviews</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Add a school if you can't find yours. */}
        <div className="space-y-2 rounded-lg border p-8 shadow-sm">
          <h3 className="text-4xl font-semibold">
            Can't find your <span className="text-primary">school</span>?
          </h3>

          <p>Write a review for a school that's not listed.</p>

          <Link
            href={`/add-school/${countryId}/${cityId}`}
            className="block w-fit"
          >
            <Button>Add School</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
