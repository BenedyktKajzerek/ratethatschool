"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import useMultistepForm from "@/hooks/useMultistepForm";
import {
  WriteReviewForm,
  ProgressBar,
  RelationshipForm,
  RateSchoolForm,
  FinalCheckForm,
} from "./index";
import { ReviewModel } from "@/types/firestoreModels";

interface StepsProps {
  initialData: ReviewModel;
  onUpdate: (updateData: ReviewModel) => void;
}

export const Steps: React.FC<StepsProps> = ({ initialData, onUpdate }) => {
  // Data provided from forms
  const [data, setData] = useState(initialData);

  // Updates form fields
  const updateFields = (fields: Partial<ReviewModel>) => {
    const updatedData = { ...data, ...fields };
    setData(updatedData);
    onUpdate(updatedData);
  };

  // Multi-step form setup
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <RelationshipForm {...data} updateFields={updateFields} />,
      <RateSchoolForm {...data} updateFields={updateFields} />,
      <WriteReviewForm {...data} updateFields={updateFields} />,
      <FinalCheckForm {...data} />,
    ]);

  // Validate step before continuing to the next one
  const validateCurrentStep = (): boolean => {
    if (currentStepIndex === 0 && !data.relationship) {
      return false;
    }

    if (
      currentStepIndex === 1 &&
      Object.values(data.ratings).some((rating) => rating === 0)
    ) {
      return false;
    }

    if (currentStepIndex === 2 && data.comment.length < 100) {
      return false;
    }

    return true;
  };

  // Enable button only when form is filled out
  const isNextDisabled = !validateCurrentStep();

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    // If form is filled out and it's not the submition
    if (!isNextDisabled && !isLastStep) return next();

    // Submitting review
    alert("Review submited");
  };

  return (
    <div className="relative mx-auto w-full max-w-[1200px] py-8">
      {/* Progress Bar */}
      <ProgressBar currentStepIndex={currentStepIndex} />

      {/* Form */}
      <form onSubmit={handleNext} className="mt-16">
        {step}

        {/* Navigation Buttons */}
        <div className="mt-16 flex justify-center space-x-4">
          {!isFirstStep && (
            <Button
              type="button"
              onClick={back}
              className="border-gray-400 bg-white text-black shadow-none hover:bg-gray-100"
            >
              Back
            </Button>
          )}

          <Button
            type="submit"
            disabled={isNextDisabled}
            className={`${isNextDisabled && "cursor-not-allowed bg-gray-500 hover:bg-gray-500"}`}
          >
            {isLastStep ? "Submit Review" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};
