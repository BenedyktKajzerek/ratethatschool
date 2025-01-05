"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import useMultistepForm from "@/hooks/useMultistepForm";
import { RatingForm } from "./RatingForm";
import { ConnectionForm } from "./ConnectionForm";
import { ProgressBar } from "./ProgressBar";

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
      <div>nothing</div>,
    ]);

  // console.log(rating);
  // console.log(steps);

  return (
    <>
      <div className="relative mx-auto mt-4 w-full max-w-[1200px]">
        <form>
          {/* ProgressBar */}
          <ProgressBar currentStepIndex={currentStepIndex} />

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
