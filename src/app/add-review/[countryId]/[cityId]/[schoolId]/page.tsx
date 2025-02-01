import React from "react";
import { AddReview } from "@/components/add-review/AddReview";

export default async function AddReviewPage({
  params,
}: Readonly<{
  params: {
    schoolId: string;
  };
}>) {
  // Await `params` to access its properties
  const { schoolId } = await params;

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
