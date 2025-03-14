import { Review } from "@/components/ui";
import { ReviewOverallSummary } from "@/components/reviews/ReviewOverallSummary";
import Link from "next/link";
import React from "react";
import { TiHome } from "react-icons/ti";
import { getReviews } from "@/utils/getReviews";
import { ReviewModel } from "@/types/firestoreModels";
import schoolImg from "@/../public/school-illustration-2.jpg";
import { Container } from "@/components/layout";

export default async function Reviews({
  params,
}: Readonly<{
  params: {
    countryId: string;
    cityId: string;
    schoolId: string;
  };
}>) {
  const { countryId, cityId, schoolId } = await params;

  // Get reviews for school
  const reviews = await getReviews(countryId, cityId, schoolId);

  const countryName = reviews[0].country.name;
  const cityName = reviews[0].city.name;
  const schoolName = reviews[0].school.name;

  const reviewsCount = reviews.length;

  let teachersOverall = 0,
    learningOverall = 0,
    facilitiesOverall = 0,
    buildingOverall = 0,
    locationOverall = 0,
    overallRating = 0;

  reviews.forEach((review) => {
    teachersOverall += review.ratings.teachers;
    learningOverall += review.ratings.learning;
    facilitiesOverall += review.ratings.facilities;
    buildingOverall += review.ratings.building;
    locationOverall += review.ratings.location;
    overallRating += review.ratingOverall;
  });

  teachersOverall = teachersOverall / reviewsCount;
  learningOverall = learningOverall / reviewsCount;
  facilitiesOverall = facilitiesOverall / reviewsCount;
  buildingOverall = buildingOverall / reviewsCount;
  locationOverall = locationOverall / reviewsCount;
  overallRating = overallRating / reviewsCount;

  return (
    <>
      {/* School background */}
      <div
        style={{
          // linear-gradient for black layer over the img
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) ,url(${schoolImg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex h-[300px]"
      >
        {/* School name */}
        <Container className="mb-6 w-full">
          <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col justify-end space-y-1">
            <h1 className="text-3xl capitalize text-white">
              {schoolName} Reviews
            </h1>

            <p className="capitalize text-white">
              {`${cityName}, `}
              {countryName}
            </p>
          </div>
        </Container>
      </div>

      {/* Write Review for that school */}
      <Container>
        <div className="mx-auto w-full max-w-[1200px] space-y-8 py-8">
          {/* Link tree */}
          <div className="flex items-center space-x-2 text-sm">
            <TiHome size={20} />
            <p>
              <span className="capitalize underline">{countryName}</span> {">"}{" "}
              <Link
                href={`/cities/${countryId}/${cityId}`}
                className="capitalize text-primary hover:underline"
              >
                {cityName}
              </Link>{" "}
              {">"} <span className="capitalize underline">{schoolName}</span>
            </p>
          </div>

          {/* Review overall ratings */}
          <ReviewOverallSummary
            reviewsCount={reviewsCount}
            overallRating={overallRating}
            reviewOverallData={{
              teachersOverall: teachersOverall,
              learningOverall: learningOverall,
              facilitiesOverall: facilitiesOverall,
              buildingOverall: buildingOverall,
              locationOverall: locationOverall,
            }}
            params={{
              countryId: countryId,
              cityId: cityId,
              schoolId: schoolId,
            }}
          />

          {/* Quick note */}
          <div>
            <h3 className="text-xl">Browse {reviewsCount} School Reviews</h3>
            <p className="text-sm">
              Did you find a review helpful? Let others know by giving it a
              like!
            </p>
          </div>

          {/* Reviews */}
          <div className="space-y-8">
            {reviews.map((review, id) => (
              <div key={id}>
                <Review reviewData={review as ReviewModel} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
