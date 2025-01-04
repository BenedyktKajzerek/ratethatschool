import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingInputProps {
  label: string;
  description: string;
  rating: number;
  setRating: (value: number) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({
  label,
  description,
  rating,
  setRating,
}) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="mb-4 mt-16 flex items-center justify-between">
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
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            className={`${
              star <= (hovered || rating) ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            <FaStar size={32} />
          </button>
        ))}
      </div>
    </div>
  );
};

export const RatingForm: React.FC<{ rating: any; setRating: any }> = ({
  rating,
  setRating,
}) => {
  return (
    <div>
      <RatingInput
        label="teachers"
        description="Quality, expertise, and engagement of the teaching staff."
        rating={rating.teachers}
        setRating={(value: number) => setRating({ ...rating, teachers: value })}
      />
      <RatingInput
        label="learning"
        description="Effectiveness of the learning environment and culture."
        rating={rating.learning}
        setRating={(value: number) => setRating({ ...rating, learning: value })}
      />
      <RatingInput
        label="facilities"
        description="Quality of libraries, labs, sports areas, and other resources."
        rating={rating.facilities}
        setRating={(value: number) =>
          setRating({ ...rating, facilities: value })
        }
      />
      <RatingInput
        label="building"
        description="Condition, cleanliness, and safety of the school premises."
        rating={rating.building}
        setRating={(value: number) => setRating({ ...rating, building: value })}
      />
      <RatingInput
        label="location"
        description="Accessibility and safety of the school's surroundings."
        rating={rating.location}
        setRating={(value: number) => setRating({ ...rating, location: value })}
      />
    </div>
  );
};
