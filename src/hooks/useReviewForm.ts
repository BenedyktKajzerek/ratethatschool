import { ReviewModel } from "@/types/firestoreModels";
import { addCity, addReview, addSchool } from "@/utils/addReview";
import { useState } from "react";

const INITIAL_DATA: ReviewModel = {
  approved: false,
  date: new Date(),
  relationship: "",
  ratings: {
    teachers: 0,
    learning: 0,
    facilities: 0,
    building: 0,
    location: 0,
  },
  comment: "",
  ratingOverall: 0,
  // Optional depeding on add-city/add-school
  schoolName: "",
  cityName: "",
  countryName: "",
  schoolRef: "", // schools/[schoolDoc]
  cityRef: "", // cities/[cityDoc]
  countryRef: "", // countries/[countryDoc]
};

export const useReviewForm = (isAddCity: boolean, isAddSchool: boolean) => {
  // Data provided from forms
  const [data, setData] = useState(INITIAL_DATA);

  // Updates form fields
  const updateFields = (fields: Partial<ReviewModel>) => {
    setData({ ...data, ...fields });
  };

  // Validate step before continuing to the next one
  const validateCurrentStep = (stepKey: string): boolean => {
    switch (stepKey) {
      case "addCityForm":
        return (
          data.cityName.length >= 3 &&
          data.cityName.length <= 100 &&
          data.schoolName.length >= 3 &&
          data.schoolName.length <= 100 &&
          data.countryName !== ""
        );
      case "addSchoolForm":
        return data.schoolName.length >= 3 && data.schoolName.length <= 100;
      case "relationshipForm":
        return Boolean(data.relationship);
      case "rateSchoolForm":
        return !Object.values(data.ratings).includes(0);
      case "writeReviewForm":
        return data.comment.length >= 100;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    if (isAddCity) addCity(data);
    else if (isAddSchool) addSchool(data);
    else addReview(data);
  };

  return { data, updateFields, validateCurrentStep, handleSubmit };
};
