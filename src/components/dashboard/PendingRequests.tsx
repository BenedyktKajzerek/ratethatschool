import React, { useState, useEffect } from "react";
import { getReviews, getSchools, getCities } from "@/utils/getReviews";
import { Review } from "./Review";

const requestsSections = [
  { id: "reviews", label: "Reviews" },
  { id: "schools", label: "Schools" },
  { id: "cities", label: "Cities" },
  { id: "images", label: "Images" },
];

export const PendingRequests: React.FC = () => {
  const [currentRequestsSection, setCurrentRequestsSection] =
    useState("reviews");
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (currentRequestsSection === "reviews") {
          data = await getReviews();
        } else if (currentRequestsSection === "schools") {
          data = await getSchools();
        } else if (currentRequestsSection === "cities") {
          data = await getCities();
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

  console.log(currentData);

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
            {currentRequestsSection === "reviews" &&
              currentData.map((review) => (
                <Review key={review.id} reviewData={review} />
              ))}

            {/* Render Placeholder for Schools */}
            {/* {currentRequestsSection === "schools" && (
              <div>
                {currentData.map((review: any) => (
                  <div key={review.id}>{review.name}</div>
                ))}
              </div>
            )} */}

            {/* Render Placeholder for Cities */}
            {/* {currentRequestsSection === "cities" && (
              <div>
                {currentData.map((review: any) => (
                  <div key={review.id}>{review.name}</div>
                ))}
              </div>
            )} */}

            {/* Render Placeholder for Images */}
            {/* {currentRequestsSection === "images" && (
              <div>Images content goes here.</div>
            )} */}
          </>
        )}
      </div>
    </>
  );
};
