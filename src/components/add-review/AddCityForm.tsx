import Link from "next/link";
import React, { useState } from "react";

// Form data
type AddCityData = {
  schoolNameParam: string;
  cityName: string;
  schoolName: string;
};

type AddCityFormProps = AddCityData & {
  // Update any number of fields
  updateFields: (fields: Partial<AddCityData>) => void;
};

export const AddCityForm: React.FC<AddCityFormProps> = ({
  cityName,
  schoolName,
  schoolNameParam,
  updateFields,
}) => {
  const [cityCharacterCount, setCityCharacterCount] = useState(0);
  const [schoolCharacterCount, setSchoolCharacterCount] = useState(0);
  const isCityCountValid = cityCharacterCount >= 3 && cityCharacterCount <= 100;
  const isSchoolCountValid =
    schoolCharacterCount >= 3 && schoolCharacterCount <= 100;

  const handleTextChange = (text: string, field: string) => {
    if (field === "city") {
      updateFields({ cityName: text });
      setCityCharacterCount(text.length);
    }
    if (field === "school") {
      updateFields({ schoolName: text });
      setSchoolCharacterCount(text.length);
    }
  };

  return (
    <div>
      <p className="mt-2">
        Enter the name of the city and the school you want to review. Make sure
        your school is not already in our{" "}
        <Link href={"#"} className="text-primary">
          directory
        </Link>
        .
      </p>

      <div>
        <label htmlFor="school-name" className="mt-8 block">
          City name
        </label>
        <input
          type="text"
          name=""
          id="city-name"
          value={cityName}
          onChange={(e) => handleTextChange(e.target.value, "city")}
          placeholder="City name"
          className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2 shadow placeholder:text-gray-300"
        />
        {/* Show when started typing and less then 100 */}
        {!isCityCountValid && cityCharacterCount > 0 && (
          <div className="text-right text-sm text-red-500">
            Must be between 3 and 100 characters.
          </div>
        )}
      </div>

      <div className="mt-8">
        <label htmlFor="school-name">School name</label>
        <input
          type="text"
          name=""
          id="school-name"
          value={schoolName}
          onChange={(e) => handleTextChange(e.target.value, "school")}
          placeholder="School name"
          className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2 shadow placeholder:text-gray-300"
        />
        {!isSchoolCountValid && schoolCharacterCount > 0 && (
          <div className="text-right text-sm text-red-500">
            Must be between 3 and 100 characters.
          </div>
        )}
      </div>
    </div>
  );
};
