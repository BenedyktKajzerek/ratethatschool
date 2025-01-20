import Link from "next/link";
import React from "react";
import { TextInput } from "./TextInput";
import { countryList } from "@/data/countryList";

// Form data
type AddCityData = {
  schoolNameParam: string;
  city: {
    name: string;
    slug: string;
    english: string | null;
  };
  school: {
    name: string;
    slug: string;
  };
  countryName: string;
};

type AddCityFormProps = AddCityData & {
  // Update any number of fields
  updateFields: (fields: Partial<AddCityData>) => void;
};

export const AddCityForm: React.FC<AddCityFormProps> = ({
  schoolNameParam,
  school = { name: "", slug: "" },
  city,
  countryName,
  updateFields,
}) => {
  const handleSchoolChange = (text: string) => {
    updateFields({ school: { ...school, name: text } });
  };

  const handleCityChange = (text: string) => {
    updateFields({ city: { ...city, name: text } });
  };

  const handleCountryChange = (text: string) => {
    updateFields({ countryName: text });
  };

  return (
    <div>
      <p className="mt-2">
        Enter the name of the city and the school you want to review. Make sure
        your school is not already in our{" "}
        <Link href={"/all-schools"} className="text-primary">
          directory
        </Link>
        .
      </p>

      <div className="mt-8">
        <select
          value={countryName}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="mt-2 w-1/4 rounded-lg border border-gray-400 px-4 py-2 shadow placeholder:text-gray-300"
        >
          <option value="" disabled hidden>
            Choose country
          </option>
          {countryList.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        <TextInput
          label="City name"
          value={city.name}
          placeholder="City name"
          onChange={handleCityChange}
          charCount={city.name.length}
          minLength={3}
          maxLength={100}
        />
      </div>

      <div className="mt-8">
        <TextInput
          label="School name"
          value={school.name}
          placeholder="School name"
          onChange={handleSchoolChange}
          charCount={school.name.length}
          minLength={3}
          maxLength={100}
        />
      </div>
    </div>
  );
};
