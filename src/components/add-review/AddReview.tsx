"use client";

import React, { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import useMultistepForm from "@/hooks/useMultistepForm";
import {
  ProgressBar,
  AddCityForm,
  AddSchoolForm,
  RelationshipForm,
  RateSchoolForm,
  WriteReviewForm,
  FinalCheckForm,
} from "./index";
import { useReviewForm } from "@/hooks/useReviewForm";

interface AddReviewProps {
  schoolNameParam: string;
  isAddCity?: boolean;
  isAddSchool?: boolean;
}

export const AddReview: React.FC<AddReviewProps> = ({
  schoolNameParam,
  isAddCity = false,
  isAddSchool = false,
}) => {
  // Custom hook for form logic | hooks\useReviewForm.ts
  const { data, updateFields, validateCurrentStep, handleSubmit } =
    useReviewForm(isAddCity, isAddSchool);

  // Multi-step form setup
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm(
      [
        isAddCity && ( // (optional) Review non-existing school in non-existing city
          <AddCityForm
            key="addCityForm"
            {...data}
            updateFields={updateFields}
            schoolNameParam={schoolNameParam}
          />
        ),
        isAddSchool && ( // (optional) Review non-existing school
          <AddSchoolForm
            key="addSchoolForm"
            {...data}
            updateFields={updateFields}
            schoolNameParam={schoolNameParam}
          />
        ),
        <RelationshipForm
          key="relationshipForm"
          {...data}
          updateFields={updateFields}
          schoolNameParam={schoolNameParam}
        />,
        <RateSchoolForm
          key="rateSchoolForm"
          {...data}
          updateFields={updateFields}
        />,
        <WriteReviewForm
          key="writeReviewForm"
          {...data}
          updateFields={updateFields}
        />,
        <FinalCheckForm
          key="writeReviewForm"
          {...data}
          schoolNameParam={schoolNameParam}
          isAddCity={isAddCity}
          isAddSchool={isAddSchool}
        />,
      ].filter(Boolean) as React.ReactElement[], // Cast to correct type
    );

  // Enable button only when form is filled out
  const isNextDisabled = !validateCurrentStep(step.key as string);

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (isNextDisabled) return;
    if (isLastStep) handleSubmit();
    else next();
  };

  let currentStepIndex2 = currentStepIndex;
  if (steps.length > 4) {
    currentStepIndex2 = currentStepIndex - 1;
  }

  return (
    <div className="relative mx-auto w-full max-w-[1200px] py-8">
      {/* Progress Bar */}
      <ProgressBar currentStepIndex={currentStepIndex2} />

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
