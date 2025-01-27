import { Review } from "@/components/ui";
import { ReviewOverallSummary } from "@/components/reviews/ReviewOverallSummary";
import Link from "next/link";
import React from "react";
import { TiHome } from "react-icons/ti";

const reviewData = {
  approved: true,
  author: null,
  date: new Date(),
  relationship: "Student",
  ratings: {
    teachers: 4,
    learning: 3,
    facilities: 5,
    building: 4,
    location: 3,
  },
  ratingOverall: 4.2,
  comment:
    "Amazing school Amazing school Amazing school Amazing school Amazing school Amazing school Amazing school Amazing school Amazing school Amazing school Amazing school",
  likes: 0,
  isAddCity: true,
  isAddSchool: false,
  city: {
    name: "mysłowice",
    slug: "myslowice",
    reference: "cities/myslowice",
  },
  school: {
    name: "ckziu w mysłowicach technikum nr 1",
    slug: "ckziu-w-myslowicach-technikum-nr-1",
    reference: "schools/ckziu-w-myslowicach-technikum-nr-1",
  },
  country: {
    name: "poland",
    slug: "poland",
    reference: "countries/poland",
  },
};

export default function Reviews() {
  return (
    <>
      {/* School background */}
      <div className="flex h-[300px] bg-gray-500">
        {/* School name */}
        <div className="mx-auto mb-6 flex w-[1200px] flex-col justify-end space-y-1">
          <h1 className="text-3xl text-white">{"School Name"} Reviews</h1>

          <p className="text-white">
            {"Country Name, "}
            {"City Name"}
          </p>
        </div>
      </div>

      {/* Write Review for that school */}
      <div className="mx-auto w-[1200px] space-y-8 py-8">
        {/* Link tree */}
        <div className="flex items-center space-x-2 text-sm">
          <TiHome size={20} />
          <p>
            <Link href={"/"} className="hover:underline">
              {"Mysłowice"}
            </Link>{" "}
            {">"} <span className="underline">{"Poland"}</span>
          </p>
        </div>

        {/* Review overall ratings */}
        <ReviewOverallSummary />

        {/* Quick note */}
        <div>
          <h3 className="text-xl">Browse {4} School Reviews</h3>
          <p className="text-sm">
            Did you find a review helpful? Let others know by giving it a like!
          </p>
        </div>

        {/* Reviews */}
        <div>
          <Review reviewData={reviewData} />
        </div>
      </div>
    </>
  );
}
