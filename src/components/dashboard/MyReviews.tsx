"use client";

import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { useAuth } from "@/context/authContext";
import { Review } from "../ui";

export function MyReviews() {
  const { user } = useAuth();
  const [myReviews, setMyReviews] = useState<any[]>([]);
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
      <h1 className="text-4xl font-medium capitalize">My Reviews</h1>

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
          <div>You currently don't have any reviews.</div>
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
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData,
        date: docData.date ? new Date(docData.date.seconds * 1000) : null, // Ensure date is a Date object
      };
    });

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
