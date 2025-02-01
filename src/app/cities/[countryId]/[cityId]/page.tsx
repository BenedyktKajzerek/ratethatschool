import React from "react";

export default async function Reviews({
  params,
}: Readonly<{
  params: {
    countryId: string;
    cityId: string;
  };
}>) {
  const { countryId, cityId } = await params;

  return (
    <>
      <h1 className="capitalize">
        {countryId}, {cityId}
      </h1>
    </>
  );
}
