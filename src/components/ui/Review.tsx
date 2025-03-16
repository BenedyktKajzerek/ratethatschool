"use client";

import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { ReviewModel } from "@/types/firestoreModels";
import { formatDistanceToNow } from "date-fns";
import { calculateOverallRating } from "@/utils/calculateOverallRating";
import { useAuth } from "@/context/authContext";
import { ModalAuth } from "../layout";
import { toggleLikeReview } from "@/utils/toggleLikeReview";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

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

  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(reviewData.likes || 0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false); // Prevent spam liking

  useEffect(() => {
    if (user) {
      checkIfUserLiked();
    }
  }, [user]);

  const checkIfUserLiked = async () => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const likedReviews: string[] = userDoc.data()?.likedReviews || [];
      setLiked(likedReviews.includes(reviewData.id));
    }
  };

  const handleLikeReview = async () => {
    if (!user) {
      setShowModal(true);
      return;
    }
    if (loading) return;

    setLoading(true);
    const newLikedStatus = await toggleLikeReview(reviewData.id, user.uid);
    if (newLikedStatus !== null) {
      setLiked(newLikedStatus);
      setLikes((prev) => (newLikedStatus ? prev + 1 : prev - 1));
    }
    setLoading(false);
  };

  return (
    <>
      <div className="space-y-4 rounded-lg border p-4 shadow-sm">
        {/* First row */}
        <div className="flex flex-wrap md:flex-nowrap md:gap-8">
          {/* Overall rating */}
          <div className="mb-4 flex items-center md:mb-0">
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
          <div className="flex w-full flex-wrap gap-4 md:w-auto">
            {ratingsOrder.map((key) => (
              <div
                key={key}
                className="flex h-fit flex-1 flex-col items-center md:mb-0"
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

          {/* Date */}
          <span className="text-xs text-gray-500">
            {reviewData.date instanceof Date
              ? formatDistanceToNow(reviewData.date, { addSuffix: true })
              : "N/A"}
          </span>

          {/* Likes */}
          <button
            onClick={handleLikeReview}
            disabled={loading} // Prevent spam liking
            className={`group relative -left-2 flex w-fit items-center rounded-full transition-colors ${
              liked ? "text-red-500" : "text-gray-500"
            }`}
          >
            <div className="flex items-center justify-center rounded-full p-2 group-hover:bg-red-50">
              {liked ? (
                <FaHeart size={18} className="text-red-500" />
              ) : (
                <FaRegHeart size={18} />
              )}
            </div>

            <div className="mx-2 text-sm">{likes}</div>
          </button>
        </div>
      </div>

      {/* Modal */}
      <ModalAuth isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
