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
      <div className="rounded-lg border shadow-sm">
        {/* First row */}
        <div className="flex">
          {/* Overall rating */}
          <div className="flex w-full max-w-[158px] flex-col items-center justify-center rounded-br-lg rounded-tl-lg bg-primary text-white">
            <p className="text-5xl font-medium">{overallRating}</p>

            <p className="flex text-yellow-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={16}
                  className={
                    star <= overallRating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </p>
          </div>

          {/* Particular ratings */}
          <div className="flex w-full space-x-4 p-4">
            {ratingsOrder.map((key) => (
              <div
                key={key}
                className="flex h-fit w-1/5 flex-col items-center rounded-b-lg border-t-4 border-primary px-6 py-2 shadow-md"
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
        <div className="flex flex-col space-y-2 p-4">
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
            {/* {reviewData.date
                ? formatDistanceToNow(
                    new Date(reviewData.date.seconds * 1000),
                    {
                      addSuffix: true,
                    },
                  )
                : "N/A"} */}
            2 months ago
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
