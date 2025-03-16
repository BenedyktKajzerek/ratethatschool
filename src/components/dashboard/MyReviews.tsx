"use client";

import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { useAuth } from "@/context/authContext";
import { Review } from "../ui";
import { ReviewModel } from "@/types/firestoreModels";

export function MyReviews() {
  const { user } = useAuth();
  const [myReviews, setMyReviews] = useState<ReviewModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);
      const reviews = await getMyReviews(user.email as string);
      setMyReviews(reviews);
      setLoading(false);
    };

    fetchReviews();
  }, [user]);

  return (
    <div>
      <h1 className="mt-6 text-4xl font-medium capitalize md:mt-0">
        My Reviews
      </h1>

      <div className="py-6">
        {loading ? (
          <p>Loading...</p>
        ) : myReviews.length > 0 ? (
          <div className="space-y-8">
            {myReviews.map((review) => (
              <div key={review.id}>
                <Review reviewData={review} />
              </div>
            ))}
          </div>
        ) : (
          <div>You currently don&apos;t have any reviews.</div>
        )}
      </div>
    </div>
  );
}

const getMyReviews = async (email: string) => {
  try {
    const q = query(collection(db, "reviews"), where("author", "==", email));
    const querySnapshot = await getDocs(q);

    // Get the data
    const data = querySnapshot.docs.map((docSnapshot) => {
      const reviewData = docSnapshot.data();
      return {
        id: docSnapshot.id,
        approved: reviewData.approved ?? false,
        author: reviewData.author ?? null,
        date: reviewData.date
          ? new Date(reviewData.date.seconds * 1000)
          : new Date(),
        isAddCity: reviewData.isAddCity ?? false,
        isAddSchool: reviewData.isAddSchool ?? false,
        relationship: reviewData.relationship ?? "",
        ratings: reviewData.ratings ?? {},
        ratingOverall: reviewData.ratingOverall ?? 0,
        comment: reviewData.comment ?? "",
        likes: reviewData.likes ?? 0,
        city: reviewData.city ?? {},
        school: reviewData.school ?? {},
        country: reviewData.country ?? {},
        images: reviewData.images ?? [],
      };
    });

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
