import React from "react";
import { AddReview } from "@/components/add-review/AddReview";

type Params = Promise<{ schoolId: string }>;

export default async function AddReviewPage(props: { params: Params }) {
  const params = await props.params;
  const schoolId = params.schoolId;

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
