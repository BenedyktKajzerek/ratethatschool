import { ReviewModel } from "@/types/firestoreModels";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const calculateOverallRating = (ratings: Record<string, number>): number => {
  const total = Object.values(ratings).reduce((sum, value) => sum + value, 0);
  const count = Object.keys(ratings).length;
  return Math.round((total / count) * 10) / 10;
};

export const addReview = async (
  data: ReviewModel,
  isAddCity: boolean,
  isAddSchool: boolean,
) => {
  const ratingOverall = calculateOverallRating(data.ratings);

  try {
    // Reference to db collection
    const collectionRef = collection(db, "pending-reviews");

    const documentData: any = {
      approved: false,
      date: new Date(),
      isAddCity: isAddCity,
      isAddSchool: isAddSchool,
      relationship: data.relationship,
      ratings: {
        teachers: data.ratings.teachers,
        learning: data.ratings.learning,
        facilities: data.ratings.facilities,
        building: data.ratings.building,
        location: data.ratings.location,
      },
      ratingOverall: ratingOverall,
      comment: data.comment,
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
  } catch (error) {
    console.error(`Error:`, error);
  }
};
