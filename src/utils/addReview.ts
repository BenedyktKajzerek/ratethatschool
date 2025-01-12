import { ReviewModel } from "@/types/firestoreModels";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addReview = async (data: ReviewModel) => {
  // Dynamically calculate overall rating
  const ratingOverall =
    Math.round(
      (Object.values(data.ratings).reduce((sum, value) => sum + value, 0) /
        Object.keys(data.ratings).length) *
        10,
    ) / 10;

  try {
    const reviewRef = collection(db, "reviews");
    await addDoc(reviewRef, {
      approved: false,
      cityID: "",
      schoolID: "",
      date: new Date(),
      relationship: data.relationship,
      ratings: {
        teachers: data.ratings.teachers,
        learning: data.ratings.learning,
        facilities: data.ratings.facilities,
        building: data.ratings.building,
        location: data.ratings.location,
      },
      comment: data.comment,
      ratingOverall: ratingOverall,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const addSchool = async (data: ReviewModel) => {};

export const addCity = async (data: ReviewModel) => {};
