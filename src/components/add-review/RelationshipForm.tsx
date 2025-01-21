import React from "react";

const RELATIONSHIPS_TO_CHOOSE = [
  "Student",
  "Teacher",
  "Parent",
  "Ex-Student",
  "Works Here",
  "Other",
];

// Form data
type RelationshipData = {
  relationship: string;
  school: {
    name: string;
    slug: string;
    reference: string;
  };
};

type RelationshipFormProps = RelationshipData & {
  // Update any number of fields
  updateFields: (fields: Partial<RelationshipData>) => void;
};

export const RelationshipForm: React.FC<RelationshipFormProps> = ({
  relationship,
  school,
  updateFields,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <h2 className="text-center text-3xl font-medium">
          <p>What is your relationship with</p>
          <span className="capitalize text-primary">{school.name}</span>?
        </h2>
      </div>

      <div className="mt-12 flex max-w-md flex-wrap justify-center gap-4">
        {RELATIONSHIPS_TO_CHOOSE.map((role) => (
          <RolePill
            key={role}
            role={role}
            isSelected={role === relationship}
            onSelect={() => updateFields({ relationship: role })}
          />
        ))}
      </div>
    </div>
  );
};

// RolePill component
interface RolePillProps {
  role: string;
  isSelected: boolean;
  onSelect: () => void;
}

const RolePill: React.FC<RolePillProps> = ({ role, isSelected, onSelect }) => {
  return (
    <>
      <label
        htmlFor={role}
        className={`cursor-pointer rounded-full border border-primary px-8 py-3 transition-colors ${
          isSelected
            ? "bg-primary text-white"
            : "hover:bg-primary hover:text-white"
        }`}
        onClick={onSelect}
      >
        {role}
      </label>
      <input
        type="radio"
        name="role"
        id={role}
        value={role}
        checked={isSelected}
        onChange={onSelect}
        className="hidden"
      />
    </>
  );
};
