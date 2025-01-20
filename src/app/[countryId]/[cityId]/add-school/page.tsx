import React from "react";
import { AddReview } from "@/components/add-review/AddReview";

export default async function AddReviewPage({
  params,
}: Readonly<{
  params: {
    cityId: string;
  };
}>) {
  // Await `params` to access its properties
  const { cityId } = await params;

  const cityNameParam = cityId.replace(/-/g, " ");

  return (
    <>
      <div className="flex h-52 items-center justify-center bg-gray-100 text-3xl font-medium capitalize">
        <h1 className="">Add new school</h1>
      </div>

      <AddReview isAddSchool={true} />
    </>
  );
}
