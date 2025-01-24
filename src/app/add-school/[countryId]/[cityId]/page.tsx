import React from "react";
import { AddReview } from "@/components/add-review/AddReview";

export default async function AddReviewPage({
  params,
}: Readonly<{
  params: {
    countryId: string;
    cityId: string;
  };
}>) {
  // Await `params` to access its properties
  const { countryId, cityId } = await params;

  return (
    <AddReview
      params={{ countryName: countryId, cityName: cityId }}
      isAddSchool={true}
    />
  );
}
