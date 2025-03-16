import React from "react";
import { AddReview } from "@/components/add-review/AddReview";

type Params = Promise<{ countryId: string; cityId: string }>;

export default async function AddReviewPage(props: { params: Params }) {
  const params = await props.params;
  const countryId = params.countryId;
  const cityId = params.cityId;

  return (
    <AddReview
      params={{ countryName: countryId, cityName: cityId }}
      isAddSchool={true}
    />
  );
}
