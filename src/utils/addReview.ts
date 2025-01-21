import { ReviewModel } from "@/types/firestoreModels";
import { db } from "../../firebaseConfig";
import { collection, addDoc, DocumentReference } from "firebase/firestore";

const calculateOverallRating = (ratings: Record<string, number>): number => {
  const total = Object.values(ratings).reduce((sum, value) => sum + value, 0);
  const count = Object.keys(ratings).length;
  return Math.round((total / count) * 10) / 10;
};

const addDocumentToCollection = async (
  data: ReviewModel,
  isAddCity?: boolean,
  isAddSchool?: boolean,
) => {
  const ratingOverall = calculateOverallRating(data.ratings);

  try {
    // Reference to db collection
    const collectionRef = collection(db, "pending-reviews");

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
      city: {
        name: data.city.name,
        slug: data.city.slug,
        reference: data.city.reference,
      },
      school: {
        name: data.school.name,
        slug: data.school.slug,
        reference: data.school.reference,
      },
      country: {
        name: data.country.name,
        slug: data.country.slug,
        reference: data.country.reference,
      },
    };

    // Create document inside the collection
    await addDoc(collectionRef, documentData);
    console.log(`Success:`, data);
  } catch (error) {
    console.error(`Error:`, error);
  }
};

// Add a review to the "reviews" collection.
export const addReview = async (data: ReviewModel) => {
  await addDocumentToCollection(data, false, false);
};

// Add a school to the "add-school" collection.
export const addSchool = async (data: ReviewModel) => {
  await addDocumentToCollection(data, false, true);
};

// Add a city to the "add-city" collection.
export const addCity = async (data: ReviewModel) => {
  await addDocumentToCollection(data, true, false);
};
