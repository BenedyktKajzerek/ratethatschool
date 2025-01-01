import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import schoolImg from "../../public/school-alt.jpg";

const PopularSchool: React.FC = () => {
  return (
    <div className="h-[324px] w-60 min-w-60">
      <Link href="#">
        <div>
          <img
            src={schoolImg.src}
            alt="School Picture"
            className="size-60 rounded-xl object-cover"
          />
        </div>
        <div className="mt-1">
          <h3 className="text-xl">CKZiU Technikum Nr 1</h3>
          <p className="text-sm">Mysłowice</p>
          <div className="mt-2 flex space-x-2">
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
