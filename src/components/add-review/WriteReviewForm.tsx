import React, { useState } from "react";
import { FaRegFileImage } from "react-icons/fa";

const MIN_COMMENT_LENGTH = 100;

// Form data
type WriteReviewData = {
  comment: string;
};

type WriteReviewFormProps = WriteReviewData & {
  // Update any number fo fields
  updateFields: (fields: Partial<WriteReviewData>) => void;
};

export const WriteReviewForm: React.FC<WriteReviewFormProps> = ({
  comment,
  updateFields,
}) => {
  const [characterCount, setCharacterCount] = useState(0);
  const charactersRemaining = MIN_COMMENT_LENGTH - characterCount;
  const isEnoughCharacters = characterCount >= MIN_COMMENT_LENGTH;

  const handleCommentChange = (text: string) => {
    updateFields({ comment: text });
    setCharacterCount(text.length);
  };

  return (
    <div>
      {/* Write a comment */}
      <div>
        <h2 className="text-3xl font-medium">
          Write a <span className="text-primary">comment</span>
        </h2>
        <p className="mt-2 text-gray-500">
          Share the pros, cons and what to expect when living at Warren Towers.
        </p>

        <textarea
          name="comment"
          id="comment"
          rows={8}
          value={comment}
          onChange={(e) => handleCommentChange(e.target.value)}
          placeholder="Write a helpful comment that's at least 100 characters."
          className="mt-8 w-full rounded-lg border border-gray-400 p-4 shadow placeholder:text-gray-300"
        />

        {/* Show when started typing and less then 100 */}
        {!isEnoughCharacters && characterCount > 0 && (
          <div className="text-right text-sm text-red-500">
            {charactersRemaining} more characters needed.
          </div>
        )}
      </div>

      {/* Upload photos */}
      <div className="mt-8">
        <h2 className="text-3xl font-medium">
          Upload <span className="text-primary">photos</span>
        </h2>
        <p className="mt-2 text-gray-500">
          Show us what your school looks like. Photos help prospective students
          more than words do! You can attach up to five photos to your review.
        </p>

        <div className="group mt-8 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200">
          <FaRegFileImage size={32} />
          <p className="mt-2 text-xl font-medium group-hover:text-primary">
            Click to upload files
          </p>
          <span className="mt-1 text-xs font-light">PNG, JPG, JPEG</span>
        </div>
      </div>
    </div>
  );
};
