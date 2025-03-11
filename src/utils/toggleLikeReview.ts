import { db } from "../../firebaseConfig";
import {
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const toggleLikeReview = async (
  reviewId: string,
  userId: string,
): Promise<boolean | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    const likedReviews = userDoc.exists()
      ? userDoc.data()?.likedReviews || []
      : [];

    const reviewRef = doc(db, "reviews", reviewId);
    const alreadyLiked = likedReviews.includes(reviewId);

    if (alreadyLiked) {
      // Unlike the review
      await updateDoc(userRef, {
        likedReviews: arrayRemove(reviewId),
      });
      await updateDoc(reviewRef, {
        likes: increment(-1),
      });
      return false;
    } else {
      // Like the review
      await setDoc(
        userRef,
        {
          likedReviews: arrayUnion(reviewId),
        },
        { merge: true },
      );
      await updateDoc(reviewRef, {
        likes: increment(1),
      });
      return true;
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return null;
  }
};
