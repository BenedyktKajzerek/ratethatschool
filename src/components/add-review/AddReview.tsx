"use client";

import React, { FormEvent, useState } from "react";
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
  params?: {
    countryName: string;
    cityName: string;
  };
  isAddCity?: boolean;
  isAddSchool?: boolean;
}

const HEADING_TEXT = "Add a school";

export const AddReview: React.FC<AddReviewProps> = ({
  params,
  isAddCity = false,
  isAddSchool = false,
}) => {
  // Custom hook for form logic | hooks\useReviewForm.ts
  const { data, updateFields, validateCurrentStep, handleSubmit } =
    useReviewForm(isAddCity, isAddSchool);

  if (isAddSchool && params) {
    data.country.slug = params?.countryName;
    data.city.slug = params?.cityName;
  }

  // Multi-step form setup
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm(
      [
        isAddCity && ( // (optional) Review non-existing school in non-existing city
          <AddCityForm
            key="addCityForm"
            {...data}
            updateFields={updateFields}
          />
        ),
        isAddSchool && ( // (optional) Review non-existing school
          <AddSchoolForm
            key="addSchoolForm"
            {...data}
            updateFields={updateFields}
          />
        ),
        <RelationshipForm
          key="relationshipForm"
          {...data}
          updateFields={updateFields}
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
          params={params}
          isAddCity={isAddCity}
          isAddSchool={isAddSchool}
        />,
      ].filter(Boolean) as React.ReactElement[], // Cast to correct type
    );

  // Enable button only when form is filled out
  const isNextDisabled = !validateCurrentStep(step.key as string);
  const [displayedSchoolName, setDisplayedSchoolName] = useState(HEADING_TEXT);

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (isNextDisabled) return;
    if (isLastStep)
      handleSubmit(); // Submit review
    else {
      // Update <h1> text on second step
      if (
        (isAddCity || isAddSchool) &&
        steps[currentStepIndex + 1]?.key === "relationshipForm"
      ) {
        setDisplayedSchoolName(`Rate ${data.school.name}` || HEADING_TEXT);
      }
      next();
    }
  };

  const handleBack = () => {
    // Change <h1> back
    if (steps[currentStepIndex]?.key === "relationshipForm") {
      setDisplayedSchoolName(HEADING_TEXT);
    }
    back();
  };

  let currentStepIndex2 = currentStepIndex;
  if (steps.length > 4) {
    currentStepIndex2 = currentStepIndex - 1;
  }

  return (
    <>
      <div className="flex h-52 items-center justify-center bg-gray-100 text-3xl font-medium">
        <h1 className="capitalize">{displayedSchoolName}</h1>
      </div>

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
                onClick={handleBack}
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
    </>
  );
};
