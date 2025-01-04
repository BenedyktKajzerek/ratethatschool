"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import useMultistepForm from "@/hooks/useMultistepForm";
import { RatingForm } from "./RatingForm";
import { ConnectionForm } from "./ConnectionForm";

const STEPS = [
  {
    name: "Rate your school",
  },
  {
    name: "Write a comment and upload photos",
  },
  {
    name: "Confirm your review",
  },
];

export const Steps: React.FC = () => {
  const [rating, setRating] = useState({
    teachers: 0,
    learning: 0,
    facilities: 0,
    building: 0,
    location: 0,
  });

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <RatingForm rating={rating} setRating={setRating} />,
      <ConnectionForm />,
    ]);

  console.log(rating);

  return (
    <>
      <div className="relative mx-auto w-full max-w-[1200px]">
        <form>
          {/* Progress bar */}
          <div className="mt-16">
            {currentStepIndex + 1} / {steps.length}
          </div>

          {/* Form */}
          {step}

          {/* Back | Next */}
          <div className="mt-16 flex justify-center space-x-4">
            {!isFirstStep && (
              <Button type="button" onClick={back}>
                Back
              </Button>
            )}
            <Button type="button" onClick={next}>
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
