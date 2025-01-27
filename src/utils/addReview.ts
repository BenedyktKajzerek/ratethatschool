import { ReviewModel } from "@/types/firestoreModels";
import { auth, db } from "../../firebaseConfig";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { calculateOverallRating } from "./calculateOverallRating";

export const addReview = async (
  data: ReviewModel,
  isAddCity: boolean,
  isAddSchool: boolean,
) => {
  const ratingOverall = calculateOverallRating(data.ratings);

  let author: string | null = null;

  // Check if a user is logged in
  const user = auth.currentUser;
  if (user) author = user.email;

  try {
    // Reference to db collection
    const collectionRef = collection(db, "pending-reviews");

    const documentData: ReviewModel = {
      approved: false,
      author: author || null,
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
      likes: 0,
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
