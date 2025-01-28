import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
  const reviews = reviewsSnap.docs.map((doc) => doc.data());
  return reviews;
};
