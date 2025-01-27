import React, { useState, useEffect } from "react";
import { getReviews } from "@/utils/getReviews";
import { Review } from "./PendingReview";
import { handleReviewAction } from "@/utils/handleReviewAction";

const requestsSections = [
  { id: "reviews", label: "Reviews" },
  { id: "cities", label: "Cities" },
  { id: "schools", label: "Schools" },
  { id: "images", label: "Images" },
];

export const PendingRequests: React.FC = () => {
  const [currentRequestsSection, setCurrentRequestsSection] =
    useState("reviews");
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState<any[]>([]);

  // Fetch reviews from firestore based on the section
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (currentRequestsSection === "reviews") {
          data = await getReviews(false, false); // isAddCity, isAddSchool
        } else if (currentRequestsSection === "cities") {
          data = await getReviews(true, false);
        } else if (currentRequestsSection === "schools") {
          data = await getReviews(false, true);
        }
        setCurrentData(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentRequestsSection]);

  return (
    <>
      {/* Menu Navigation */}
      <div className="space-x-4 py-2 text-lg">
        {requestsSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setCurrentRequestsSection(section.id)}
            className={`px-4 pb-2 ${
              currentRequestsSection === section.id
                ? "border-b-2 border-primary font-medium text-primary"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="space-y-6 py-6">
        <h2 className="text-4xl font-medium capitalize">
          Pending {currentRequestsSection}
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Render Pending Reviews */}
            {(currentRequestsSection === "reviews" || "cities" || "schools") &&
              currentData.map((review) => (
                <div key={review.id}>
                  <Review
                    reviewData={review}
                    showActionButtons={true}
                    onReviewAction={(reviewId, approved) =>
                      handleReviewAction(
                        reviewId,
                        approved,
                        currentData,
                        setCurrentData,
                      )
                    }
                  />
                </div>
              ))}

            {/* Render Placeholder for Images */}
            {currentRequestsSection === "images" && (
              <div>Images content goes here.</div>
            )}
          </>
        )}
      </div>
    </>
  );
};
