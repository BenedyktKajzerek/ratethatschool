import { ReviewModel } from "@/types/firestoreModels";
import { auth, db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { calculateOverallRating } from "./calculateOverallRating";

export const addReview = async (
  data: ReviewModel,
  isAddCity: boolean,
  isAddSchool: boolean,
): Promise<boolean> => {
  const ratingOverall = calculateOverallRating(data.ratings);
  let author: string | null = null;

  // Check if a user is logged in
  const user = auth.currentUser;
  if (user) author = user.email;

  try {
    // Reference to db collection
    const collectionRef = collection(db, "pending-reviews");

    const documentData: ReviewModel = {
      id: "",
      approved: false,
      author: author || null,
      date: new Date(),
      isAddCity,
      isAddSchool,
      relationship: data.relationship,
      ratings: { ...data.ratings },
      ratingOverall,
      comment: data.comment,
      likes: 0,
      city: { ...data.city },
      school: { ...data.school },
      country: { ...data.country },
    };

    // Create document inside the collection
    await addDoc(collectionRef, documentData);

    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
