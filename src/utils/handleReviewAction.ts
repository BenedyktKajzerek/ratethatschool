import { db } from "../../firebaseConfig";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

export const handleReviewAction = async (
  reviewId: string,
  approved: boolean,
  currentData: any[],
  setCurrentData: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  try {
    const review = currentData.find((review) => review.id === reviewId);
    if (!review) return;

    const targetCollection = approved ? "reviews" : "rejected-reviews";

    // Add to target collection
    const newDocRef = doc(db, targetCollection, reviewId);
    await setDoc(newDocRef, review);

    // Remove from 'pending-reviews'
    const deleteDocRef = doc(db, "pending-reviews", reviewId);
    await deleteDoc(deleteDocRef);

    // Update local state
    setCurrentData((prev) => prev.filter((review) => review.id !== reviewId));
  } catch (error) {
    console.error(
      `Error ${approved ? "approving" : "rejecting"} review:`,
      error,
    );
  }
};
