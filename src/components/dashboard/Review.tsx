import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui";

const ratings = {
  teachers: 5,
  learning: 4,
  facilities: 4,
  building: 5,
  location: 3,
};

export const Review: React.FC = () => {
  return (
    <div className="flex max-w-[800px] flex-col space-y-8 bg-gray-100 p-6">
      <div className="flex space-x-8">
        {/* Overall + Ratings */}
        <div>
          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-green-500">
            <span>Overall</span>
            <p className="text-3xl font-medium">4.2</p>
          </div>

          {Object.entries(ratings).map(([key, value]) => (
            <div key={key} className="mt-4 flex flex-col">
              <p className="capitalize">{key}</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= value ? "text-yellow-500" : "text-gray-400"
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
            <div className="flex flex-col">
              <span className="text-lg font-medium">CKZiU w Myslowicach</span>
              <span className="text-xs">Myslowice, Poland</span>
            </div>
            <span>16.01.2025</span>
          </div>

          <div>
            Relationship: <span className="font-medium">Student</span>
          </div>

          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A
            temporibus iste fugit eius modi culpa possimus sapiente repellat
            nisi atque sed rerum aliquid quibusdam blanditiis unde quos
            accusantium nemo dolorum earum, totam reiciendis? Earum labore
            dignissimos illum. Ratione, quod soluta?
          </div>

          <div className="bottom-0 flex w-fit items-center rounded-full bg-gray-200">
            <button className="rounded-full p-2 hover:bg-gray-300 hover:text-green-500">
              <BiUpvote size={18} />
            </button>
            <div className="mx-1 text-sm">3</div>

            <button className="rounded-full p-2 hover:bg-gray-300 hover:text-red-400">
              <BiDownvote size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button className="">Approve</Button>
        <Button className="bg-red-500 hover:bg-red-600">Decline</Button>
      </div>
    </div>
  );
};
