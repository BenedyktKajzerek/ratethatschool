import Link from "next/link";
import React, { useState } from "react";
import { TextInput } from "./TextInput";
import { countryList } from "@/data/countryList";

// Form data
type AddCityData = {
  schoolNameParam: string;
  schoolName: string;
  cityName: string;
  countryName: string;
};

type AddCityFormProps = AddCityData & {
  // Update any number of fields
  updateFields: (fields: Partial<AddCityData>) => void;
};

export const AddCityForm: React.FC<AddCityFormProps> = ({
  schoolNameParam,
  schoolName,
  cityName,
  countryName,
  updateFields,
}) => {
  const handleSchoolChange = (text: string) => {
    updateFields({ schoolName: text });
  };

  const handleCityChange = (text: string) => {
    updateFields({ cityName: text });
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
          value={cityName}
          placeholder="City name"
          onChange={handleCityChange}
          charCount={cityName.length}
          minLength={3}
          maxLength={100}
        />
      </div>

      <div className="mt-8">
        <TextInput
          label="School name"
          value={schoolName}
          placeholder="School name"
          onChange={handleSchoolChange}
          charCount={schoolName.length}
          minLength={3}
          maxLength={100}
        />
      </div>
    </div>
  );
};
