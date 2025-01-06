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
  const [connection, setConnection] = useState(INITIAL_DATA.relationship);
  const [rating, setRating] = useState(INITIAL_DATA.ratings);
  const [comment, setComment] = useState(INITIAL_DATA.comment);

  // General form logic + all singular forms
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <RelationshipForm
        relationship={connection}
        setRelationship={setConnection}
      />,
      <RateSchoolForm rating={rating} setRating={setRating} />,
      <WriteReviewForm comment={comment} setComment={setComment} />,
      <FinalCheckForm
        comment={comment}
        rating={rating}
        connection={connection}
      />,
    ]);

  return (
    <>
      <div className="relative mx-auto w-full max-w-[1200px] py-8">
        <ProgressBar currentStepIndex={currentStepIndex} />

        <form className="mt-16">
          {step}

          {/* Back | Next */}
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
    </>
  );
};
