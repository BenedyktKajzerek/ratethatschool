import React from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Link from "next/link";

const ratingsOrder = [
  { key: "teachersOverall", label: "Teachers" },
  { key: "learningOverall", label: "Learning" },
  { key: "facilitiesOverall", label: "Facilities" },
  { key: "buildingOverall", label: "Building" },
  { key: "locationOverall", label: "Location" },
];

interface ReviewOverallSummaryProps {
  reviewsCount: number;
  overallRating: number;
  reviewOverallData: {
    teachersOverall: number;
    learningOverall: number;
    facilitiesOverall: number;
    buildingOverall: number;
    locationOverall: number;
  };
  params: {
    countryId: string;
    cityId: string;
    schoolId: string;
  };
}

export const ReviewOverallSummary: React.FC<ReviewOverallSummaryProps> = ({
  reviewsCount,
  overallRating,
  reviewOverallData,
  params: { countryId, cityId, schoolId },
}) => {
  return (
    <div className="mx-auto flex w-full flex-wrap rounded-lg border shadow-sm md:flex-nowrap">
      {/* Overall rating (square) */}
      <div className="flex w-full max-w-full flex-shrink-0 flex-col items-center justify-center space-y-1 rounded-l-lg bg-green-500 py-6 text-white md:aspect-square md:max-w-[158px]">
        <p className="text-6xl font-medium">{overallRating.toFixed(1)}</p>

        <div className="flex text-yellow-500">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={16}
              className={
                star <= Math.round(overallRating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <p className="text-sm font-light">{reviewsCount} Reviews</p>
      </div>

      {/* Category ratings */}
      <div className="flex w-full flex-col space-y-4 p-4">
        {/* Categories Container */}
        <div className="flex w-full flex-wrap justify-center gap-3">
          {ratingsOrder.map(({ key, label }) => (
            <div
              key={key}
              className="flex min-w-[150px] max-w-full flex-1 flex-col items-center rounded-lg border-t-4 border-primary px-4 py-2 shadow-md"
            >
              {/* Category */}
              <p className="capitalize">{label}</p>

              <div className="flex items-center space-x-2">
                {/* Rating */}
                <p>
                  {reviewOverallData[
                    key as keyof typeof reviewOverallData
                  ].toFixed(1)}
                </p>

                {/* Stars */}
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <=
                        Math.round(
                          reviewOverallData[
                            key as keyof typeof reviewOverallData
                          ],
                        )
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }
                    >
                      <FaStar size={18} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write review button */}
        <div className="flex">
          <Link
            href={`/add-review/${countryId}/${cityId}/${schoolId}`}
            className="w-full md:max-w-[200px]"
          >
            <Button className="flex w-full justify-center space-x-2 py-2">
              <HiOutlinePencilAlt size={24} />
              <span className="text-base">Write a Review</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
