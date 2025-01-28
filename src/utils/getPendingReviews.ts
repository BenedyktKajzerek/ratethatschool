import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getPendingReviews = async (
  isAddCity: boolean,
  isAddSchool: boolean,
) => {
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
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
