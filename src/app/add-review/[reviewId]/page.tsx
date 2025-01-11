"use client";

import React, { useState } from "react";
import { Steps } from "@/components/add-review/AddReview";
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

export default async function AddReview({
  params,
}: Readonly<{
  params: {
    reviewId: string;
  };
}>) {
  const [reviewData, setReviewData] = useState(INITIAL_DATA);

  const handleUpdate = (updatedData: ReviewModel) => {
    setReviewData(updatedData); // Update local state with new data
  };

  return (
    <>
      <div className="flex h-52 items-center justify-center bg-gray-100 text-3xl font-medium capitalize">
        {/* <h1>{params.reviewId}</h1> */}
        <h1>Some School</h1>
      </div>

      <Steps initialData={reviewData} onUpdate={handleUpdate} />
    </>
  );
}
