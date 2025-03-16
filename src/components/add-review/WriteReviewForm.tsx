import Image from "next/image";
import React, { useState } from "react";
import { FaRegFileImage, FaTimesCircle } from "react-icons/fa";

const MIN_COMMENT_LENGTH = 75;

// Form data
type WriteReviewData = {
  comment: string;
  images: string[];
};

type WriteReviewFormProps = WriteReviewData & {
  // Update any number fo fields
  updateFields: (fields: Partial<WriteReviewData>) => void;
};

export const WriteReviewForm: React.FC<WriteReviewFormProps> = ({
  comment,
  images,
  updateFields,
}) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [imagePreviews, setImagePreviews] = useState<string[]>(images);

  const charactersRemaining = MIN_COMMENT_LENGTH - characterCount;
  const isEnoughCharacters = characterCount >= MIN_COMMENT_LENGTH;

  const handleCommentChange = (text: string) => {
    updateFields({ comment: text });
    setCharacterCount(text.length);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 5); // Max 5 images
    const base64Images = await Promise.all(
      fileArray.map((file) => convertToBase64(file)),
    );

    setImagePreviews(base64Images);
    updateFields({ images: base64Images });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to delete image from preview
  const handleDeleteImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const updatedImages = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedImages);
    updateFields({ images: updatedImages });
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
          placeholder="Write a helpful comment that's at least 75 characters."
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

        {/* Image Previews */}
        <div className="mt-4 flex flex-wrap gap-4">
          {imagePreviews.map((src, index) => (
            <div key={index} className="relative">
              <Image
                src={src}
                alt="Preview Image"
                className="h-24 w-24 rounded-lg object-cover"
              />

              {/* Delete image btn */}
              <button
                onClick={(e) => handleDeleteImage(index, e)}
                className="absolute -right-[10px] -top-[10px]"
                aria-label="Delete image"
              >
                <FaTimesCircle size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Photos input */}
        <input
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleFileChange}
          id="imageUpload"
          className="hidden"
        />
        <label htmlFor="imageUpload" className="cursor-pointer">
          <div className="group relative mt-8 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200">
            <FaRegFileImage size={32} />
            <p className="mt-2 text-xl font-medium group-hover:text-primary">
              Click to upload photos
            </p>
            <span className="mt-1 text-xs font-light">PNG, JPG, JPEG</span>
          </div>
        </label>
      </div>
    </div>
  );
};
