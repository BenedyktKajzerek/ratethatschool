import {
  CityModel,
  CountryModel,
  ReviewModel,
  SchoolModel,
} from "@/types/firestoreModels";
import { db } from "../../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const handleReviewAction = async (
  reviewId: string,
  approved: boolean,
  currentData: any[],
  setCurrentData: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  try {
    const review = currentData.find((review) => review.id === reviewId);
    if (!review) return;

    review.approved = approved;
    const targetCollection = approved ? "reviews" : "rejected-reviews";

    // Create country & city doc if isAddCity
    if (approved && review.isAddCity) {
      // Check if the country document already exists
      const countryDocRef = doc(db, "countries", review.country.slug);
      const countryDocSnapshot = await getDoc(countryDocRef);

      if (!countryDocSnapshot.exists()) {
        const countryDoc: CountryModel = {
          name: review.country.name,
          slug: review.country.slug,
        };
        await setDoc(countryDocRef, countryDoc);
      }

      // Check if the city document already exists
      const cityDocRef = doc(db, "cities", review.city.slug);
      const cityDocSnapshot = await getDoc(cityDocRef);

      if (!cityDocSnapshot.exists()) {
        const cityDoc: CityModel = {
          name: review.city.name,
          slug: review.city.slug,
          country: {
            name: review.city.name,
            slug: review.city.slug,
            reference: review.city.reference,
          },
          reviewsCount: 1,
        };
        await setDoc(cityDocRef, cityDoc);
      }
    }

    // Create schoolDoc doc if isAddCity or isAddSchool
    if (approved && (review.isAddCity || review.isAddSchool)) {
      // Check if the school document already exists
      const schoolDocRef = doc(db, "schools", review.school.slug);
      const schoolDocSnapshot = await getDoc(schoolDocRef);

      if (!schoolDocSnapshot.exists()) {
        const schoolDoc: SchoolModel = {
          name: review.school.name,
          slug: review.school.slug,
          city: {
            name: review.city.name,
            slug: review.city.slug,
            reference: review.city.reference,
          },
          country: {
            name: review.country.name,
            slug: review.country.slug,
            reference: review.country.reference,
          },
          ratingOverall: 0,
          reviewsCount: 0,
        };
        await setDoc(schoolDocRef, schoolDoc);
      }
    }

    // Add to target collection
    const reviewDocRef = doc(db, targetCollection, reviewId);
    await setDoc(reviewDocRef, review);

    // Update schools ratingOverall & totalReviews
    if (approved) {
      const schoolDocRef = doc(db, "schools", review.school.slug);
      const schoolDocSnapshot = await getDoc(schoolDocRef);

      if (schoolDocSnapshot.exists()) {
        const schoolDocData = schoolDocSnapshot.data() as SchoolModel;

        // Get all reviews for this school
        const reviewsQuery = query(
          collection(db, "reviews"),
          where("school.slug", "==", review.school.slug),
        );
        const reviewsSnapShot = await getDocs(reviewsQuery);

        let totalRating = 0;
        let reviewCount = 0;

        // Get ratings from all reviews to calculate overall school rating
        reviewsSnapShot.forEach((doc) => {
          const reviewData = doc.data() as ReviewModel;
          totalRating += reviewData.ratingOverall;
          reviewCount++;
        });

        const ratingOverall =
          reviewCount > 0
            ? Math.round((totalRating / reviewCount) * 10) / 10
            : 0;

        // Update the school doc with new rating
        const updatedSchoolDoc: SchoolModel = {
          ...schoolDocData,
          ratingOverall: ratingOverall,
          reviewsCount: reviewCount,
        };
        await setDoc(schoolDocRef, updatedSchoolDoc);
      }

      // Increment city reviews count
      const cityDocRef = doc(db, "cities", review.city.slug);
      await updateDoc(cityDocRef, {
        reviewsCount: increment(1),
      });
    }

    // Remove review from 'pending-reviews'
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
