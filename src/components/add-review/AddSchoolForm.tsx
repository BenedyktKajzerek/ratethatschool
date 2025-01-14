import Link from "next/link";
import React, { useState } from "react";
import { TextInput } from "./TextInput";

// Form data
type AddSchoolData = {
  schoolNameParam: string;
  relationship: string;
  schoolName: string;
};

type AddSchoolFormProps = AddSchoolData & {
  // Update any number of fields
  updateFields: (fields: Partial<AddSchoolData>) => void;
};

export const AddSchoolForm: React.FC<AddSchoolFormProps> = ({
  schoolName,
  schoolNameParam,
  updateFields,
}) => {
  const handleSchoolChange = (text: string) => {
    updateFields({ schoolName: text });
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
