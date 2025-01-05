import React from "react";
import { Steps } from "@/components/add-review/AddReview";

export default async function AddReview({
  params,
}: Readonly<{
  params: {
    reviewId: string;
  };
}>) {
  return (
    <>
      <div className="flex h-52 items-center justify-center bg-gray-100 text-3xl font-medium capitalize">
        {/* <h1>{params.reviewId}</h1> */}
        <h1>Some School</h1>
      </div>

      <Steps />
    </>
  );
}
