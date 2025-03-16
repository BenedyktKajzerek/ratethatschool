import React from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui";
import { ReviewModel } from "@/types/firestoreModels";

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
  showActionButtons?: boolean; // Optional prop for approve/reject btns
  onReviewAction?: (reviewId: string, approved: boolean) => void;
}

export const Review: React.FC<ReviewProps> = ({
  reviewData,
  showActionButtons = false,
  onReviewAction,
}) => {
  // Calculate overallRating
  const ratings: Ratings = reviewData.ratings;
  const overallRating = (
    Object.values(ratings).reduce((a: number, b: number) => a + b, 0) /
    Object.values(ratings).length
  ).toFixed(1);

  const handleReviewAction = (reviewId: string, approved: boolean) => {
    if (onReviewAction) {
      onReviewAction(reviewId, approved);
    }
  };

  return (
    <div
      id={reviewData.id}
      className="flex max-w-[800px] flex-col space-y-8 bg-gray-100 p-6"
    >
      <div className="flex space-x-8">
        <div>
          {/* Overall rating */}
          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-green-500">
            <span>Overall</span>
            <p className="text-3xl font-medium">{overallRating}</p>
          </div>

          {/* Particular ratings */}
          {ratingsOrder.map((key) => (
            <div key={key} className="mt-4 flex flex-col">
              <p className="capitalize">{key}</p>
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

        {/* Review */}
        <div className="relative space-y-4">
          <div className="flex justify-between">
            {/* SchoolName, CityName, CountryName */}
            <div className="flex flex-col">
              <span className="text-lg font-medium capitalize">
                {reviewData.school.name}
              </span>

              <span className="text-xs capitalize">
                {reviewData.city.name}, <span>{reviewData.country.name}</span>
              </span>
            </div>

            {/* Date */}
            <span>
              {reviewData.date
                ? new Date(reviewData.date.seconds * 1000).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )
                : "N/A"}
            </span>
          </div>

          {/* Relationship */}
          <div>
            Relationship:{" "}
            <span className="font-medium">{reviewData.relationship}</span>
          </div>

          {/* Comment */}
          <div className="break-all">
            <p className="font-medium">
              {reviewData.author || "Anonymous User"}
            </p>
            {reviewData.comment}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            {reviewData.images.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt="Image"
                  className="h-24 w-24 rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Approve/Reject buttons */}
      {showActionButtons && (
        <div className="flex justify-end space-x-4">
          <Button onClick={() => handleReviewAction(reviewData.id, true)}>
            Approve
          </Button>
          <Button
            onClick={() => handleReviewAction(reviewData.id, false)}
            className="bg-red-500 hover:bg-red-600"
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};
