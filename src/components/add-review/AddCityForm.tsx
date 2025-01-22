import Link from "next/link";
import React from "react";
import { TextInput } from "./TextInput";
import { countryList } from "@/data/countryList";
import { generateSlug } from "@/utils/generateSlug";

// Form data
type AddCityData = {
  city: {
    name: string;
    slug: string;
    reference: string;
  };
  school: {
    name: string;
    slug: string;
    reference: string;
  };
  country: {
    name: string;
    slug: string;
    reference: string;
  };
};

type AddCityFormProps = AddCityData & {
  // Update any number of fields
  updateFields: (fields: Partial<AddCityData>) => void;
};

export const AddCityForm: React.FC<AddCityFormProps> = ({
  school = { name: "" },
  city = { name: "" },
  country = { name: "" },
  updateFields,
}) => {
  // Create slug & reference from input text
  const handleSchoolChange = (text: string) => {
    const slug = generateSlug(text);
    const reference = `schools/${slug}`;

    updateFields({
      school: { ...school, name: text, slug: slug, reference: reference },
    });
  };

  // Create slug & reference from input text
  const handleCityChange = (text: string) => {
    const slug = generateSlug(text);
    const reference = `cities/${slug}`;

    updateFields({
      city: { ...city, name: text, slug: slug, reference: reference },
    });
  };

  // Create slug & reference from input text
  const handleCountryChange = (text: string) => {
    const slug = generateSlug(text);
    const reference = `countries/${slug}`;

    updateFields({
      country: { ...country, name: text, slug: slug, reference: reference },
    });
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
          value={country.name}
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
