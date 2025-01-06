import React, { useState } from "react";
import { RolePill } from "./RolePill";

interface setRelationshipProps {
  relationship: string;
  setRelationship: (value: string) => void;
}

export const RelationshipForm: React.FC<setRelationshipProps> = ({
  relationship,
  setRelationship,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <h2 className="text-center text-3xl font-medium">
          <p>What is your relationship with</p>
          <span className="capitalize text-primary">{"some school"}</span>?
        </h2>
      </div>

      <div className="mt-12 flex max-w-md flex-wrap justify-center gap-4">
        {[
          "Student",
          "Teacher",
          "Parent",
          "Ex-Student",
          "Works Here",
          "Other",
        ].map((role) => (
          <RolePill
            key={role}
            role={role}
            selectedRole={relationship}
            setSelectedRole={setRelationship}
          />
        ))}
      </div>
    </div>
  );
};
