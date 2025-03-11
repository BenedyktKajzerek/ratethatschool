"use client";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { useAuth } from "@/context/authContext";
import { Review } from "../ui";

export function LikedReviews() {
  const { user } = useAuth();
  const [likedReviews, setLikedReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const fetchLikedReviews = async () => {
      setLoading(true);
      const reviews = await getLikedReviews(user.uid);
      setLikedReviews(reviews);
      setLoading(false);
    };

    fetchLikedReviews();
  }, [user]);

  return (
    <div>
      <h1 className="text-4xl font-medium capitalize">Liked Reviews</h1>

      <div className="py-6">
        {loading ? (
          <p>Loading...</p>
        ) : likedReviews.length > 0 ? (
          <div className="space-y-8">
            {likedReviews.map((review) => (
              <div key={review.id}>
                <Review reviewData={review} />
              </div>
            ))}
          </div>
        ) : (
          <div>You currently don't have any liked reviews.</div>
        )}
      </div>
    </div>
  );
}

const getLikedReviews = async (userId: string) => {
  try {
    // Fetch the user's document to get the liked reviews' IDs
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const likedReviewsIds = userDoc.exists()
      ? userDoc.data()?.likedReviews || []
      : [];

    if (likedReviewsIds.length === 0) {
      return [];
    }

    // Fetch the reviews using the liked review IDs
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("id", "in", likedReviewsIds),
    );
    const querySnapshot = await getDocs(reviewsQuery);

    const likedReviews = querySnapshot.docs.map((docSnapshot) => {
      const reviewData = docSnapshot.data();
      return {
        id: docSnapshot.id,
        ...reviewData,
        date: reviewData.date ? new Date(reviewData.date.seconds * 1000) : null, // Ensure date is a Date object
      };
    });
    return likedReviews;
  } catch (error) {
    console.error("Error fetching liked reviews:", error);
    return [];
  }
};
