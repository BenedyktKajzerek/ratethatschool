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

  const countryNameParam = countryId.replace(/-/g, " ");
  const cityNameParam = cityId.replace(/-/g, " ");

  return (
    <AddReview
      params={{ countryName: countryNameParam, cityName: cityNameParam }}
      isAddSchool={true}
    />
  );
}
