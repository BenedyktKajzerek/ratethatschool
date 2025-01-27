import React from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui";
import { HiOutlinePencilAlt } from "react-icons/hi";

const ratingsOrder = [
  "teachers",
  "learning",
  "facilities",
  "building",
  "location",
];

const ratings: any = {
  teachers: 4,
  learning: 5,
  facilities: 3,
  building: 4,
  location: 3,
};

export const ReviewOverallSummary: React.FC = () => {
  return (
    <div className="flex rounded-lg border shadow-sm">
      {/* Overall rating (square) */}
      <div className="flex aspect-square w-full max-w-[158px] flex-col items-center justify-center space-y-1 rounded-l-lg bg-green-500 text-white">
        <p className="text-6xl font-medium">{4.2}</p>

        <p className="flex text-yellow-500">
          <FaStar size={16} />
          <FaStar size={16} />
          <FaStar size={16} />
          <FaStar size={16} className="text-gray-300" />
          <FaStar size={16} className="text-gray-300" />
        </p>

        <p className="text-sm font-light">{20} Reviews</p>
      </div>

      <div className="flex w-full flex-col space-y-4 p-4">
        {/* Particular overall ratings */}
        <div className="flex space-x-4">
          {ratingsOrder.map((key) => (
            <div
              key={key}
              className="flex h-fit w-1/5 flex-col rounded-b-lg border-t-4 border-primary px-6 py-2 shadow-md"
            >
              <p className="capitalize">{key}</p>

              {/* Stars */}
              <div className="flex items-center space-x-2">
                <p>4.1</p>

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
            </div>
          ))}
        </div>

        {/* Write review button */}
        <Button className="flex w-1/3 justify-center space-x-2 py-2">
          <HiOutlinePencilAlt size={24} />
          <span className="text-base">Write a Review</span>
        </Button>
      </div>
    </div>
  );
};
