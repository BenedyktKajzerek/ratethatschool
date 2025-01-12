import React from "react";
import { AddReview } from "@/components/add-review/AddReview";

export default async function AddReviewPage({
  params,
}: Readonly<{
  params: {
    reviewId: string;
  };
}>) {
  // Await `params` to access its properties
  const { reviewId } = await params;

  const schoolName = reviewId.replace(/-/g, " ");

  return (
    <>
      <div className="flex h-52 items-center justify-center bg-gray-100 text-3xl font-medium capitalize">
        <h1 className="">Rate {schoolName}</h1>
      </div>

      <AddReview schoolName={schoolName} />
    </>
  );
}
