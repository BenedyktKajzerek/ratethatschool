import { ReviewModel } from "@/types/firestoreModels";
import { auth, db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { calculateOverallRating } from "./calculateOverallRating";

export const addReview = async (
  data: ReviewModel,
  isAddCity: boolean,
  isAddSchool: boolean,
): Promise<boolean> => {
  const ratingOverall = calculateOverallRating(data.ratings);
  let author: string | null = null;

  // Check if a user is logged in
  const user = auth.currentUser;
  if (user) author = user.email;

  try {
    // Function to upload photos to Cloudinary
    const handleUploadPhotos = async () => {
      if (data.images.length === 0) return [];

      try {
        const uploadedUrls = await Promise.all(
          data.images.map(async (image) => {
            const res = await fetch("/api/upload", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image }),
            });

            if (!res.ok) {
              throw new Error("Image upload failed");
            }

            const data = await res.json();
            return data.url;
          }),
        );
        return uploadedUrls;
      } catch (error) {
        console.error("Image upload failed:", error);
        return [];
      }
    };

    // Upload images first and get URLs
    const uploadedImageUrls: string[] = await handleUploadPhotos();

    // Reference to db collection
    const collectionRef = collection(db, "pending-reviews");

    // Document data
    const documentData: ReviewModel = {
      id: "",
      approved: false,
      author: author || null,
      date: new Date(),
      isAddCity,
      isAddSchool,
      relationship: data.relationship,
      ratings: { ...data.ratings },
      ratingOverall,
      comment: data.comment,
      likes: 0,
      city: { ...data.city },
      school: { ...data.school },
      country: { ...data.country },
      images: uploadedImageUrls,
    };

    // Create document inside the collection
    await addDoc(collectionRef, documentData);

    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
