import React, { useState, useEffect } from "react";
import { getPendingReviews } from "@/utils/getPendingReviews";
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
          data = await getPendingReviews(false, false); // isAddCity, isAddSchool
        } else if (currentRequestsSection === "cities") {
          data = await getPendingReviews(true, false);
        } else if (currentRequestsSection === "schools") {
          data = await getPendingReviews(false, true);
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
      <div className="flex justify-between pt-4 text-lg sm:space-x-4 md:justify-start md:py-2">
        {requestsSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setCurrentRequestsSection(section.id)}
            className={`pb-2 sm:px-4 ${
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
