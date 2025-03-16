"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import useMultistepForm from "@/hooks/useMultistepForm";
import { useReviewForm } from "@/hooks/useReviewForm";
import {
  ProgressBar,
  AddCityForm,
  AddSchoolForm,
  RelationshipForm,
  RateSchoolForm,
  WriteReviewForm,
  FinalCheckForm,
} from "./index";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import schoolImg from "@/../public/school-illustration-2.jpg";
import { useRouter } from "next/navigation";
import { Container } from "../layout";

interface AddReviewProps {
  params?: {
    countryName: string;
    cityName: string;
  };
  isAddCity?: boolean;
  isAddSchool?: boolean;
  schoolId?: string;
}

const HEADING_TEXT = "Add a school";
export const AddReview: React.FC<AddReviewProps> = ({
  params,
  isAddCity = false,
  isAddSchool = false,
  schoolId,
}) => {
  // Custom hook for form logic | hooks\useReviewForm.ts
  const { data, updateFields, validateCurrentStep, handleSubmit } =
    useReviewForm(isAddCity, isAddSchool);

  // To redirect after submitting
  const router = useRouter();

  // If isAddSchool - update fields based on url
  useEffect(() => {
    if (isAddSchool && params) {
      fetchCityAndCountryData(params).then((updatedData) =>
        updateFields(updatedData),
      );
    }

    // If add-review - update fields based on url
    if (!isAddCity && !isAddSchool && schoolId) {
      const getSchoolData = async () => {
        const schoolData = await fetchSchoolData(schoolId);

        updateFields({
          school: {
            name: schoolData.name,
            slug: schoolData.slug,
            reference: `schools/${schoolData.slug}`,
          },
          city: {
            name: schoolData.city.name,
            slug: schoolData.city.slug,
            reference: `cities/${schoolData.city.slug}`,
          },
          country: {
            name: schoolData.country.name,
            slug: schoolData.country.slug,
            reference: `countries/${schoolData.country.slug}`,
          },
        });

        setdynamicSchoolName(`Rate ${schoolData.name}`);
      };

      getSchoolData();
    }
  }, [params]);

  // Multi-step form setup
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm(
      [
        isAddCity && ( // (optional) Review non-existing school in non-existing city
          <AddCityForm
            key="addCityForm"
            {...data}
            updateFields={updateFields}
          />
        ),
        isAddSchool && ( // (optional) Review non-existing school
          <AddSchoolForm
            key="addSchoolForm"
            {...data}
            updateFields={updateFields}
          />
        ),
        <RelationshipForm
          key="relationshipForm"
          {...data}
          updateFields={updateFields}
        />,
        <RateSchoolForm
          key="rateSchoolForm"
          {...data}
          updateFields={updateFields}
        />,
        <WriteReviewForm
          key="writeReviewForm"
          {...data}
          updateFields={updateFields}
        />,
        <FinalCheckForm
          key="writeReviewForm"
          {...data}
          isAddCity={isAddCity}
          isAddSchool={isAddSchool}
        />,
      ].filter(Boolean) as React.ReactElement[], // Cast to correct type
    );

  // Enable button only when form is filled out
  const isNextDisabled = !validateCurrentStep(step.key as string);

  // State for the heading text (school name)
  const [dynamicSchoolName, setdynamicSchoolName] = useState(HEADING_TEXT);

  const handleNext = async (e: FormEvent) => {
    e.preventDefault();

    if (isNextDisabled) return;

    if (isLastStep) {
      const success = await handleSubmit(); // Submit review

      if (success) {
        router.push("/");
      } else {
        alert("Error submitting the review. Try again later.");
      }
    } else {
      // Update <h1> text on second step
      if (
        (isAddCity || isAddSchool) &&
        steps[currentStepIndex + 1]?.key === "relationshipForm"
      ) {
        setdynamicSchoolName(`Rate ${data.school.name}` || HEADING_TEXT);
      }
      next();
    }
  };

  const handleBack = () => {
    // Change <h1> back
    if (steps[currentStepIndex]?.key === "relationshipForm") {
      setdynamicSchoolName(HEADING_TEXT);
    }
    back();
  };

  // Update index if there's additional step (addCity/addSchool)
  let currentStepIndex2 = currentStepIndex;
  if (steps.length > 4) {
    currentStepIndex2 = currentStepIndex - 1;
  }

  return (
    <>
      <div
        style={{
          // linear-gradient for black layer over the img
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) ,url(${schoolImg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex h-52 items-center justify-center text-3xl font-medium"
      >
        <Container>
          <h1 className="capitalize text-white">{dynamicSchoolName}</h1>
        </Container>
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] py-8">
        <Container>
          {/* Progress Bar */}
          <ProgressBar currentStepIndex={currentStepIndex2} />

          {/* Form */}
          <form onSubmit={handleNext} className="mt-16">
            {step}

            {/* Navigation Buttons */}
            <div className="mt-16 flex justify-center space-x-4">
              {!isFirstStep && (
                <Button
                  type="button"
                  onClick={handleBack}
                  className="border-gray-400 bg-white text-black shadow-none hover:bg-gray-100"
                >
                  Back
                </Button>
              )}

              <Button
                type="submit"
                disabled={isNextDisabled}
                className={`${isNextDisabled && "cursor-not-allowed bg-gray-500 hover:bg-gray-500"}`}
              >
                {isLastStep ? "Submit Review" : "Next"}
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

const fetchCityAndCountryData = async (params: {
  cityName: string;
  countryName: string;
}) => {
  const { cityName, countryName } = params;

  // Create firestore db query
  const cityQuery = query(
    collection(db, "cities"),
    where("slug", "==", cityName),
  );
  const countryQuery = query(
    collection(db, "countries"),
    where("slug", "==", countryName),
  );

  // Create snapshot
  const [citySnapshot, countrySnapshot] = await Promise.all([
    getDocs(cityQuery),
    getDocs(countryQuery),
  ]);

  // Get the data
  const cityData = citySnapshot.docs[0]?.data() || {};
  const countryData = countrySnapshot.docs[0]?.data() || {};

  // Return data to updateFields()
  return {
    city: {
      slug: cityName,
      name: cityData.name,
      reference: `cities/${cityName}`,
    },
    country: {
      slug: countryName,
      name: countryData.name,
      reference: `countries/${countryName}`,
    },
  };
};

const fetchSchoolData = async (schoolId: string) => {
  const q = query(collection(db, "schools"), where("slug", "==", schoolId));
  const querySnapshot = await getDocs(q);
  const schoolData = querySnapshot.docs[0]?.data();

  return schoolData;
};
