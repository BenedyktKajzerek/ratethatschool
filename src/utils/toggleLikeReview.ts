import { Truculenta } from "next/font/google";
import { db } from "../../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const toggleLikeReview = async (
  reviewId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    const likeRef = doc(collection(reviewRef, "likes"), userId); // Subcollection for likes

    const likeDoc = await getDoc(likeRef);

    if (likeDoc.exists()) {
      // If already liked, remove like
      await deleteDoc(likeRef);
      await updateDoc(reviewRef, {
        likes: increment(-1),
      });
      return false;
    } else {
      // If not liked, add like
      await setDoc(likeRef, { userId });
      await updateDoc(reviewRef, {
        likes: increment(1),
      });
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
