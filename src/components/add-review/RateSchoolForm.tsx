import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const RATINGS = [
  {
    label: "teachers",
    description: "Quality, expertise, and engagement of the teaching staff.",
  },
  {
    label: "learning",
    description: "Effectiveness of the learning environment and culture.",
  },
  {
    label: "facilities",
    description:
      "Quality of libraries, labs, sports areas, and other resources.",
  },
  {
    label: "building",
    description: "Condition, cleanliness, and safety of the school premises.",
  },
  {
    label: "location",
    description: "Accessibility and safety of the school's surroundings.",
  },
];

// Ratings type based on ReviewModel
type Ratings = {
  teachers: number;
  learning: number;
  facilities: number;
  building: number;
  location: number;
};

type RateSchoolFormProps = {
  ratings: Ratings;
  updateFields: (fields: Partial<{ ratings: Ratings }>) => void;
};

interface RatingInputProps {
  label: keyof Ratings;
  description: string;
  rating: number;
  updateFields: (fields: Partial<{ ratings: Ratings }>) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({
  label,
  description,
  rating,
  updateFields,
}) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="mt-16 flex items-center justify-between">
      <div>
        <div className="text-3xl font-medium">
          Rate the <span className="text-primary">{label}</span>
        </div>
        <div className="mt-1 text-gray-500">{description}</div>
      </div>

      <div className="flex gap-2" onMouseLeave={() => setHovered(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() =>
              updateFields({ ratings: { ...{ [label]: star } } as Ratings })
            }
            onMouseEnter={() => setHovered(star)}
            className={
              star <= (hovered || rating) ? "text-yellow-500" : "text-gray-400"
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
      {RATINGS.map((r) => (
        <RatingInput
          key={r.label}
          label={r.label as keyof Ratings}
          description={r.description}
          rating={ratings[r.label as keyof Ratings]} // Access the rating
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
