import { Button } from "@/components/ui";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { TiHome } from "react-icons/ti";

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
export default function Reviews() {
  return (
    <>
      <div className="flex h-[300px] bg-gray-500">
        {/* School name & overall rating */}
        <div className="mx-auto mb-6 flex w-[1200px] flex-col justify-end space-y-1">
          <h1 className="text-3xl text-white">{"School Name"} Reviews</h1>

          <p className="text-white">
            {"Country Name, "}
            {"City Name"}
          </p>

          {/* <p className="flex space-x-1 text-yellow-300">
            <FaStar size={32} />
            <FaStar size={32} />
            <FaStar size={32} />
            <FaStar size={32} className="text-gray-400" />
            <FaStar size={32} className="text-gray-400" />
          </p> */}
        </div>
      </div>

      {/* Write Review for that school */}
      <div className="mx-auto w-[1200px] space-y-8 py-8">
        <p className="flex items-center space-x-2 text-sm">
          <TiHome size={20} />
          <p>
            <Link href={"/"} className="hover:underline">
              {"Mysłowice"}
            </Link>{" "}
            {">"} <span className="underline">{"Poland"}</span>
          </p>
        </p>

        <div className="">
          <Button className="flex items-center space-x-2 px-20 py-2">
            <HiOutlinePencilAlt size={24} />
            <span className="text-base">Write a Review</span>
          </Button>
        </div>

        {/* Overall + Ratings */}
        <div className="rounded-lg border border-gray-400">
          <div className="flex">
            <div className="flex h-36 w-36 flex-shrink-0 flex-col items-center justify-center rounded-tl-lg bg-primary text-white">
              <p className="text-6xl font-medium">{3.1}</p>
              <p className="flex text-yellow-300">
                <FaStar size={16} />
                <FaStar size={16} />
                <FaStar size={16} />
                <FaStar size={16} className="text-gray-400" />
                <FaStar size={16} className="text-gray-400" />
              </p>
              <p className="text-sm font-light">{20} Reviews</p>
            </div>

            <div className="flex w-full">
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
          </div>
        </div>
      </div>
    </>
  );
}
