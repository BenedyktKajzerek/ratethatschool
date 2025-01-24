import { CityModel, CountryModel, SchoolModel } from "@/types/firestoreModels";
import { db } from "../../firebaseConfig";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

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
          countryRef: review.country.reference,
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
        };
        await setDoc(schoolDocRef, schoolDoc);
      }
    }

    // Add to target collection
    const reviewDocRef = doc(db, targetCollection, reviewId);
    await setDoc(reviewDocRef, review);

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
