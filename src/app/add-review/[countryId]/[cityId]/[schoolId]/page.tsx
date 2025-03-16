import React from "react";
import { AddReview } from "@/components/add-review/AddReview";

export default function AddReviewPage({
  params,
}: Readonly<{
  params: {
    schoolId: string;
  };
}>) {
  // Await `params` to access its properties
  const { schoolId } = params;

  return (
    <>
      <AddReview
        params={undefined}
        isAddCity={false}
        isAddSchool={false}
        schoolId={schoolId}
      />
    </>
  );
}
