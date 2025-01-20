import Link from "next/link";
import React from "react";
import { TextInput } from "./TextInput";
import { generateSlug } from "@/utils/generateSlug";

// Form data
type AddSchoolData = {
  relationship: string;
  school: {
    name: string;
    slug: string;
  };
};

type AddSchoolFormProps = AddSchoolData & {
  // Update any number of fields
  updateFields: (fields: Partial<AddSchoolData>) => void;
};

export const AddSchoolForm: React.FC<AddSchoolFormProps> = ({
  school = { name: "", slug: "" },
  updateFields,
}) => {
  const handleSchoolChange = (text: string) => {
    updateFields({
      school: { ...school, name: text, slug: generateSlug(school.name) },
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
