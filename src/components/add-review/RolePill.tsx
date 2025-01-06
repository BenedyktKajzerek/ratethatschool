import React from "react";

interface RolePillProps {
  role: string;
  selectedRole: string;
  setSelectedRole: (value: string) => void;
}

export const RolePill: React.FC<RolePillProps> = ({
  role,
  selectedRole,
  setSelectedRole,
}) => {
  const isSelected = selectedRole === role;

  return (
    <>
      <label
        htmlFor={role}
        className={`cursor-pointer rounded-full border border-primary px-8 py-3 transition-colors ${
          isSelected
            ? "bg-primary text-white"
            : "hover:bg-primary hover:text-white"
        }`}
        onClick={() => {
          setSelectedRole(role);
        }}
      >
        {role}
      </label>
      <input
        type="radio"
        name="role"
        id={role}
        value={role}
        checked={isSelected}
        onChange={() => {
          setSelectedRole(role);
        }}
        className="hidden"
      />
    </>
  );
};
