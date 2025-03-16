import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ReviewModel } from "@/types/firestoreModels";

export const getReviews = async (
  countrySlug: string,
  citySlug: string,
  schoolSlug: string,
) => {
  // // Create firestore db query
  const reviewsQuery = query(
    collection(db, "reviews"),
    where("country.slug", "==", countrySlug),
    where("city.slug", "==", citySlug),
    where("school.slug", "==", schoolSlug),
  );

  // Create snapshot
  const reviewsSnap = await getDocs(reviewsQuery);

  // Get the data
  const reviews = reviewsSnap.docs.map((doc) => {
    const data = doc.data();

    // Convert Firestore timestamp to ISO string
    return {
      ...data,
      date: data.date?.seconds ? new Date(data.date.seconds * 1000) : null,
    } as ReviewModel;
  });

  // Sort reviews from latest to oldest
  return reviews.sort(
    (a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0),
  );
};
