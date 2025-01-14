interface TextInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  charCount: number;
  minLength: number;
  maxLength: number;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  charCount,
  minLength,
  maxLength,
}) => {
  const isValid = charCount >= minLength && charCount <= maxLength;

  return (
    <>
      <label htmlFor={label.toLowerCase().replace(" ", "-")}>{label}</label>
      <input
        type="text"
        id={label.toLowerCase().replace(" ", "-")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2 shadow placeholder:text-gray-300"
      />
      {!isValid && charCount > 0 && (
        <div className="text-right text-sm text-red-500">
          Must be between {minLength} and {maxLength} characters.
        </div>
      )}
    </>
  );
};
