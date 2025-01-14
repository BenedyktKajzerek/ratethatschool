import { ReviewModel } from "@/types/firestoreModels";
import { db } from "../../firebaseConfig";
import { collection, addDoc, DocumentReference } from "firebase/firestore";

const calculateOverallRating = (ratings: Record<string, number>): number => {
  const total = Object.values(ratings).reduce((sum, value) => sum + value, 0);
  const count = Object.keys(ratings).length;
  return Math.round((total / count) * 10) / 10;
};

const addDocumentToCollection = async (
  collectionName: string,
  data: ReviewModel,
) => {
  const ratingOverall = calculateOverallRating(data.ratings);

  try {
    // Reference to db collection
    const collectionRef = collection(db, collectionName);

    // Base document data
    const documentData: any = {
      approved: false,
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
    };

    // Add conditional fields
    if (collectionName === "reviews") {
      documentData.schoolRef = data.schoolRef;
      documentData.cityRef = data.cityRef;
      documentData.countryRef = data.countryRef;
    } else if (collectionName === "add-school") {
      documentData.schoolName = data.schoolName;
      documentData.cityRef = data.cityRef;
      documentData.countryRef = data.countryRef;
    } else if (collectionName === "add-city") {
      documentData.schoolName = data.schoolName;
      documentData.cityName = data.cityName;
      documentData.countryName = data.countryName;
    }

    // Create document inside the collection
    await addDoc(collectionRef, documentData);
    console.log(`Successfully added to ${collectionName}:`, data);
  } catch (error) {
    console.error(`Error adding to ${collectionName}:`, error);
  }
};

// Add a review to the "reviews" collection.
export const addReview = async (data: ReviewModel) => {
  await addDocumentToCollection("reviews", data);
};

// Add a school to the "add-school" collection.
export const addSchool = async (data: ReviewModel) => {
  await addDocumentToCollection("add-school", data);
};

// Add a city to the "add-city" collection.
export const addCity = async (data: ReviewModel) => {
  await addDocumentToCollection("add-city", data);
};
