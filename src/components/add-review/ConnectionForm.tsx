import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export const ConnectionForm: React.FC = () => {
  const [rating, setRating] = useState<number>(0);

  const handleRating = (value: number) => {
    setRating(value);
  };

  return (
    <div>
      <div>
        <div>
          Rate the <span className="text-primary">teachers</span>
        </div>
        <div>Quality, expertise, and engagement of the teaching staff.</div>
      </div>

      <div className="flex cursor-pointer gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{ color: star <= rating ? "gold" : "gray" }}
          >
            <FaStar />
          </span>
        ))}
      </div>
    </div>
  );
};
