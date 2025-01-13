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
  AddCityForm,
  AddSchoolForm,
} from "./index";
import { ReviewModel } from "@/types/firestoreModels";
import { addReview, addCity, addSchool } from "@/utils/addReview";

const INITIAL_DATA: ReviewModel = {
  approved: false,
  cityID: "", // cities/[document]
  schoolID: "", // schools/[document]
  date: new Date(),
  relationship: "",
  ratings: {
    teachers: 0,
    learning: 0,
    facilities: 0,
    building: 0,
    location: 0,
  },
  comment: "",
  ratingOverall: 0,
  // Optional depeding on add-city/add-school
  cityName: "",
  schoolName: "",
};

interface AddReviewProps {
  schoolNameParam: string;
  isAddCity?: boolean;
  isAddSchool?: boolean;
}

export const AddReview: React.FC<AddReviewProps> = ({
  schoolNameParam,
  isAddCity,
  isAddSchool,
}) => {
  // Data provided from forms
  const [data, setData] = useState(INITIAL_DATA);

  // Updates form fields
  const updateFields = (fields: Partial<ReviewModel>) => {
    setData({ ...data, ...fields });
  };

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
        />,
      ].filter(Boolean) as React.ReactElement[], // Cast to correct type
    );

  // Validate step before continuing to the next one
  const validateCurrentStep = (): boolean => {
    if (
      step.key === "addCityForm" &&
      (data.cityName.length > 100 ||
        data.cityName.length < 3 ||
        data.schoolName.length > 100 ||
        data.schoolName.length < 3)
    ) {
      return false;
    }

    if (
      step.key === "addSchoolForm" &&
      (data.schoolName.length > 100 || data.schoolName.length < 3)
    ) {
      return false;
    }

    if (step.key === "relationshipForm" && !data.relationship) {
      return false;
    }

    if (
      step.key === "rateSchoolForm" &&
      Object.values(data.ratings).some((rating) => rating === 0)
    ) {
      return false;
    }

    if (step.key === "writeReviewForm" && data.comment.length < 100) {
      return false;
    }

    return true;
  };

  // Enable button only when form is filled out
  const isNextDisabled = !validateCurrentStep();

  const handleNext = (e: FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) return false;
    if (!isLastStep) return next();
    if (isAddCity) return addCity(data);
    if (isAddSchool) return addSchool(data);
    addReview(data);
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
