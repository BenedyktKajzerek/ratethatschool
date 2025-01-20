// getReviews.ts
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const getDocumentsFromCollection = async (collectionName: string) => {
  try {
    const q = query(
      collection(db, collectionName),
      where("approved", "==", false),
    );
    const querySnapshot = await getDocs(q);
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

export const getReviews = async () => getDocumentsFromCollection("reviews");
export const getSchools = async () => getDocumentsFromCollection("add-school");
export const getCities = async () => getDocumentsFromCollection("add-city");
