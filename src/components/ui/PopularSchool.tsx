import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

const PopularSchool: React.FC = () => {
  return (
    <div className="w-60 h-[324px] min-w-60">
      <Link href="#">
        <div>
          <img
            src="#"
            alt="School Picture"
            className="size-60 border border-green-500 rounded-xl"
          />
        </div>
        <div className="mt-1">
          <h3 className="text-xl">CKZiU Technikum Nr 1</h3>
          <p className="text-sm">Mysłowice</p>
          <div className="flex mt-2 space-x-2">
            <div className="flex">
              <span>
                <FaStar color="orange" />
              </span>
              <span>
                <FaStar color="orange" />
              </span>
              <span>
                <FaStar color="orange" />
              </span>
              <span>
                <FaStar color="orange" />
              </span>
              <span>
                <FaStar color="lightgray" />
              </span>
            </div>

            <div className="text-sm">174 reviews</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export { PopularSchool };
