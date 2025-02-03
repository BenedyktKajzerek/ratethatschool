import React from "react";
import { FaStar } from "react-icons/fa";

export default function Stars({ ratingOverall }: { ratingOverall: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={16}
          className={
            star <= Math.round(ratingOverall)
              ? "text-yellow-500"
              : "text-gray-400"
          }
        />
      ))}
    </div>
  );
}
