import Link from "next/link";
import React, { useState } from "react";

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
  const [schoolCharacterCount, setSchoolCharacterCount] = useState(0);
  const isSchoolCountValid =
    schoolCharacterCount >= 3 && schoolCharacterCount <= 100;

  const handleTextChange = (text: string) => {
    updateFields({ schoolName: text });
    setSchoolCharacterCount(text.length);
  };

  return (
    <div>
      <p className="mt-2">
        Enter the name of the school you want to review. Make sure your school
        is not already in our{" "}
        <Link href={"#"} className="text-primary">
          directory
        </Link>
        .
      </p>

      <div className="mt-8">
        <label htmlFor="school-name">School name</label>
        <input
          type="text"
          name=""
          id="school-name"
          value={schoolName}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="School name"
          className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2 shadow placeholder:text-gray-300"
        />
        {/* Show when started typing and less then 100 */}
        {!isSchoolCountValid && schoolCharacterCount > 0 && (
          <div className="text-right text-sm text-red-500">
            Must be between 3 and 100 characters.
          </div>
        )}
      </div>
    </div>
  );
};
