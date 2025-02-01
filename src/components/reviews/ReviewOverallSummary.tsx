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
    <div className="flex rounded-lg border shadow-sm">
      {/* Overall rating (square) */}
      <div className="flex aspect-square w-full max-w-[158px] flex-col items-center justify-center space-y-1 rounded-l-lg bg-green-500 text-white">
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
        <div className="flex space-x-4">
          {ratingsOrder.map(({ key, label }) => (
            <div
              key={key}
              className="flex h-fit w-1/5 flex-col rounded-b-lg border-t-4 border-primary px-6 py-2 shadow-md"
            >
              <p className="capitalize">{label}</p>
              <div className="flex items-center space-x-2">
                <p>
                  {reviewOverallData[
                    key as keyof typeof reviewOverallData
                  ].toFixed(1)}
                </p>

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
        <Link href={`/add-review/${countryId}/${cityId}/${schoolId}`}>
          <Button className="flex w-1/3 justify-center space-x-2 py-2">
            <HiOutlinePencilAlt size={24} />
            <span className="text-base">Write a Review</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
