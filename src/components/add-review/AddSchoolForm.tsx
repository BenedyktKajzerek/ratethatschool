import Link from "next/link";
import React from "react";
import { TextInput } from "./index";
import { generateSlug } from "@/utils/generateSlug";

// Form data
type AddSchoolData = {
  school: {
    name: string;
    slug: string;
    reference: string;
  };
  city: {
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

type AddSchoolFormProps = AddSchoolData & {
  // Update any number of fields
  updateFields: (fields: Partial<AddSchoolData>) => void;
};

export const AddSchoolForm: React.FC<AddSchoolFormProps> = ({
  school = { name: "", slug: "", reference: "" },
  city = { name: "", slug: "", reference: "" },
  country = { name: "", slug: "", reference: "" },
  updateFields,
}) => {
  const handleSchoolChange = (text: string) => {
    const slug = generateSlug(text);
    const reference = `schools/${slug}`;

    updateFields({
      school: { ...school, name: text, slug: slug, reference: reference },
    });
  };

  return (
    <div>
      <p className="mt-2">
        Enter the name of the school you want to review. Make sure your school
        is not already in our{" "}
        <Link href={"/all-schools"} className="text-primary">
          directory
        </Link>
        .
      </p>

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
