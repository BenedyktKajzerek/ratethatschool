import { ReviewModel } from "@/types/firestoreModels";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getPendingReviews = async (
  isAddCity: boolean,
  isAddSchool: boolean,
): Promise<ReviewModel[]> => {
  try {
    // Create firestore db query
    let q;
    if (isAddCity) {
      q = query(
        collection(db, "pending-reviews"),
        where("isAddCity", "==", true),
      );
    } else if (isAddSchool) {
      q = query(
        collection(db, "pending-reviews"),
        where("isAddSchool", "==", true),
      );
    } else {
      q = query(
        collection(db, "pending-reviews"),
        where("isAddCity", "==", false),
        where("isAddSchool", "==", false),
      );
    }

    // Create snapshot
    const querySnapshot = await getDocs(q);

    // Get the data
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ReviewModel[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
