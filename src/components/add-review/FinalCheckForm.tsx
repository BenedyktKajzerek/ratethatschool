import React from "react";
import { FaStar } from "react-icons/fa";

type RatingData = {
  teachers: number;
  learning: number;
  facilities: number;
  building: number;
  location: number;
};

type FinalCheckFormProps = {
  relationship: string;
  ratings: RatingData;
  comment: string;
  city?: {
    name: string;
    slug: string;
  };
  school?: {
    name: string;
    slug: string;
  };
  country?: {
    name: string;
  };
  isAddCity: boolean;
  isAddSchool: boolean;
};

export const FinalCheckForm: React.FC<FinalCheckFormProps> = ({
  relationship,
  ratings,
  comment,
  city = { name: "[YourCity]" },
  school = { name: "[YourSchool]" },
  country = { name: "[YourCountry]" },
  isAddCity,
  isAddSchool,
}) => {
  return (
    <div>
      <div>
        <h2 className="text-3xl">
          Confirm your review for{" "}
          <span className="capitalize text-primary">{school.name}</span> at{" "}
          <span className="capitalize">
            {city.name} <span className="text-sm">{country.name}</span>
          </span>
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          All reviews are subject to approval.
        </p>
      </div>

      <div className="mt-8 flex w-full space-x-20 rounded-lg bg-gray-100 p-10">
        <div className="text-xl">
          {/* School connection */}
          <div className="flex">
            <div className="w-56">Relationship</div>
            <div className="text-nowrap">{relationship}</div>
          </div>

          {/* School rating */}
          {Object.entries(ratings).map(([key, value]) => (
            <div key={key} className="mt-6 flex items-center">
              <p className="w-56 capitalize">{key}</p>

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

        <div className="space-y-8 overflow-x-hidden">
          <div className="overflow-x-auto">
            <p className="text-xl">Comment</p>
            <p className="mt-2">{comment}</p>
          </div>
          <div>
            <p className="text-xl">Photos</p>
            <p className="mt-2">{comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
