import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import schoolImg from "@/../public/school-alt.jpg";
import { SchoolModel } from "@/types/firestoreModels";
import Image from "next/image";

interface PopularSchoolProps {
  school: SchoolModel;
}

export const PopularSchool: React.FC<PopularSchoolProps> = ({ school }) => {
  return (
    <div className="h-[324px] w-60 min-w-60">
      <Link
        href={`reviews/${school.country.slug}/${school.city.slug}/${school.slug}`}
      >
        {/* School image */}
        <div>
          <Image
            src={schoolImg.src}
            alt="School Picture"
            className="h-60 w-60 rounded-xl object-cover"
          />
        </div>

        <div className="mt-1">
          {/* Name and location */}
          <h3 className="truncate text-xl capitalize">{school.name}</h3>
          <p className="truncate text-sm capitalize">{`${school.country.name}, ${school.city.name}`}</p>

          {/* Rating */}
          <div className="mt-2 flex space-x-2">
            <div className="flex text-yellow-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(school.ratingOverall)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* Reviews count */}
            <div className="text-sm">{school.reviewsCount} Reviews</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
