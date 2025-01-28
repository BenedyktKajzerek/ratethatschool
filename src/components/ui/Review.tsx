import React from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { ReviewModel } from "@/types/firestoreModels";
import { formatDistanceToNow } from "date-fns";
import { calculateOverallRating } from "@/utils/calculateOverallRating";

const ratingsOrder = [
  "teachers",
  "learning",
  "facilities",
  "building",
  "location",
];

interface Ratings {
  [key: string]: number;
}

interface ReviewProps {
  reviewData: ReviewModel; // ReviewModel
}

export const Review: React.FC<ReviewProps> = ({ reviewData }) => {
  // Calculate overallRating
  const ratings: Ratings = reviewData.ratings;
  const overallRating = calculateOverallRating(ratings);

  return (
    <>
      <div className="space-y-4 rounded-lg border p-4 shadow-sm">
        {/* First row */}
        <div className="flex space-x-8">
          {/* Overall rating */}
          <div className="flex items-center">
            <div className="relative w-10 bg-primary py-1 pl-1 text-center text-2xl font-medium text-white">
              <span>{overallRating.toFixed(1)}</span>
              {/* Bigger triangle */}
              <div className="absolute right-0 top-0 z-10 h-0 w-0 translate-x-[100%] border-y-[20px] border-l-[20px] border-y-transparent border-l-primary" />
            </div>

            <div className="relative flex bg-gray-600 py-2.5 pl-6 pr-1 text-yellow-500">
              {/* Smaller triangle */}
              <div className="absolute right-0 top-0 h-0 w-0 translate-x-[100%] border-y-[18px] border-l-[18px] border-y-transparent border-l-gray-600" />
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(overallRating)
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }
                />
              ))}
            </div>
          </div>

          {/* Particular ratings */}
          <div className="flex w-full space-x-4">
            {ratingsOrder.map((key) => (
              <div
                key={key}
                className="flex h-fit flex-col items-center rounded-b-lg"
              >
                <p className="capitalize">{key}</p>

                {/* Stars */}
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= (ratings[key] || 0)
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }
                    >
                      <FaStar size={18} />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second row */}
        <div className="flex flex-col space-y-2">
          {/* Relationship & Date */}
          <div className="flex items-center justify-between">
            <div>
              <span>Relationship:</span>{" "}
              <span className="font-medium">{reviewData.relationship}</span>
            </div>
          </div>

          {/* Comment */}
          <p className="break-words text-gray-700">{reviewData.comment}</p>

          {/* Date */}
          <span className="text-xs text-gray-500">
            {reviewData.date
              ? formatDistanceToNow(new Date(reviewData.date.seconds * 1000), {
                  addSuffix: true,
                })
              : "N/A"}
          </span>

          {/* Likes */}
          <button className="group relative -left-2 flex w-fit items-center rounded-full">
            <div className="flex items-center justify-center rounded-full p-2 group-hover:bg-red-50">
              <FaRegHeart
                size={18}
                className="text-gray-500 transition-colors group-hover:text-red-500"
              />
            </div>
            <div className="mx-2 text-sm text-gray-500 transition-colors group-hover:text-red-500">
              {reviewData.likes || 0}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
