import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const RATING_CATEGORIES = [
  {
    category: "teachers",
    description: "Quality, expertise, and engagement of the teaching staff.",
  },
  {
    category: "learning",
    description: "Effectiveness of the learning environment and culture.",
  },
  {
    category: "facilities",
    description:
      "Quality of libraries, labs, sports areas, and other resources.",
  },
  {
    category: "building",
    description: "Condition, cleanliness, and safety of the school premises.",
  },
  {
    category: "location",
    description: "Accessibility and safety of the school's surroundings.",
  },
];

// Ratings type based on ReviewModel
type RatingData = {
  teachers: number;
  learning: number;
  facilities: number;
  building: number;
  location: number;
};

type RateSchoolFormProps = {
  ratings: RatingData;
  updateFields: (fields: Partial<{ ratings: RatingData }>) => void;
};

interface RatingInputProps {
  category: keyof RatingData;
  description: string;
  currentRating: number;
  updateFields: (fields: Partial<{ ratings: RatingData }>) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({
  category,
  description,
  currentRating,
  updateFields,
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="mt-16 items-center justify-between space-y-4 md:flex md:space-x-0">
      <div>
        <div className="text-3xl font-medium">
          Rate the <span className="text-primary">{category}</span>
        </div>
        <div className="mt-1 text-gray-500">{description}</div>
      </div>

      <div className="flex gap-2" onMouseLeave={() => setHoveredRating(0)}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() =>
              updateFields({
                ratings: { ...{ [category]: rating } } as RatingData,
              })
            }
            onMouseEnter={() => setHoveredRating(rating)}
            className={
              rating <= (hoveredRating || currentRating)
                ? "text-yellow-500"
                : "text-gray-400"
            }
          >
            <FaStar size={32} />
          </button>
        ))}
      </div>
    </div>
  );
};

export const RateSchoolForm: React.FC<RateSchoolFormProps> = ({
  ratings,
  updateFields,
}) => {
  return (
    <div>
      {RATING_CATEGORIES.map((category) => (
        <RatingInput
          key={category.category}
          category={category.category as keyof RatingData}
          description={category.description}
          currentRating={ratings[category.category as keyof RatingData]} // Access the rating
          updateFields={(fields) =>
            updateFields({
              ratings: { ...ratings, ...fields.ratings },
            })
          }
        />
      ))}
    </div>
  );
};
