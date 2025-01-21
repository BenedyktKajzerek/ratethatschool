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
  isAddCity: false,
  isAddSchool: false,
  school: {
    name: "",
    slug: "",
    reference: "",
  },
  city: {
    name: "",
    slug: "",
    reference: "",
  },
  country: {
    name: "",
    slug: "",
    reference: "",
  },
};

export const useReviewForm = (isAddCity: boolean, isAddSchool: boolean) => {
  // Data provided from forms
  const [data, setData] = useState(INITIAL_DATA);

  data.isAddCity = isAddCity;
  data.isAddSchool = isAddSchool;

  // Updates form fields
  const updateFields = (fields: Partial<ReviewModel>) => {
    setData({ ...data, ...fields });
  };

  // Validate step before continuing to the next one
  const validateCurrentStep = (stepKey: string): boolean => {
    switch (stepKey) {
      case "addCityForm":
        return (
          data.city.name.length >= 3 &&
          data.city.name.length <= 100 &&
          data.school.name.length >= 3 &&
          data.school.name.length <= 100 &&
          data.country.name !== ""
        );
      case "addSchoolForm":
        return data.school.name.length >= 3 && data.school.name.length <= 100;
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
