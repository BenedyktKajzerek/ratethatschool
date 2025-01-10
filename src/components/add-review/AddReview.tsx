"use client";

import React, { useState } from "react";
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

const INITIAL_DATA: ReviewModel = {
  id: "",
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
};

export const Steps: React.FC = () => {
  // Data provided from forms
  const [data, setData] = useState(INITIAL_DATA);

  // Updates form fields
  const updateFields = (fields: Partial<ReviewModel>) =>
    setData((prev) => {
      return { ...prev, ...fields };
    });

  // Multi-step form setup
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <RelationshipForm {...data} updateFields={updateFields} />,
      <RateSchoolForm {...data} updateFields={updateFields} />,
      // <WriteReviewForm {...data} updateFields={updateFields} />,
      // <FinalCheckForm {...data} updateFields={updateFields} />,
    ]);

  // Debugging current data
  console.log(data);

  return (
    <div className="relative mx-auto w-full max-w-[1200px] py-8">
      {/* Progress Bar */}
      <ProgressBar currentStepIndex={currentStepIndex} />

      {/* Form */}
      <form className="mt-16">
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
          <Button type="button" onClick={next}>
            {isLastStep ? "Submit Review" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};
