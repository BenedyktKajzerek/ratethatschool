"use client";

import { Review } from "@/components/dashboard/Review";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";

const requestsSections = [
  { id: "reviews", label: "Reviews" },
  { id: "schools", label: "Schools" },
  { id: "cities", label: "Cities" },
  { id: "images", label: "Images" },
];

const dashboardPages = [
  { id: "requests", label: "Pending Requests", icon: MdOutlinePendingActions },
  { id: "reviews", label: "My Reviews", icon: VscPreview },
  { id: "settings", label: "Settings", icon: IoSettingsOutline },
];

const SidebarButton = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center space-x-3 rounded-md p-2 hover:bg-gray-100 ${
      active ? "font-medium text-primary" : "text-black"
    }`}
  >
    <Icon size={24} className={active ? "text-primary" : "text-gray-500"} />
    <span>{label}</span>
  </button>
);

const DashboardPage = () => {
  const [currentRequestsSection, setCurrentRequestsSection] =
    useState("reviews");
  const [currentDashboardPage, setCurrentDashboardPage] = useState("requests");

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <div className="flex w-[300px] flex-col items-start space-y-2 pl-4 text-lg">
        {dashboardPages.map((page) => (
          <SidebarButton
            key={page.id}
            icon={page.icon}
            label={page.label}
            active={currentDashboardPage === page.id}
            onClick={() => setCurrentDashboardPage(page.id)}
          />
        ))}
      </div>

      <div className="w-full px-8">
        {/* Pending Requests Page */}
        {currentDashboardPage === "requests" && (
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
                Pending {currentRequestsSection} (1)
              </h2>

              {/* Pending reviews */}
              {currentRequestsSection === "reviews" && (
                <>
                  <Review />
                  <Review />
                </>
              )}

              {/* Pending Schools */}
              {currentRequestsSection === "schools" && (
                <>
                  <div>Schools content goes here.</div>
                </>
              )}

              {/* Pending Citites */}
              {currentRequestsSection === "cities" && (
                <>
                  <div>Cities content goes here.</div>
                </>
              )}

              {/* Pending Images */}
              {currentRequestsSection === "images" && (
                <>
                  <div>Images content goes here.</div>
                </>
              )}
            </div>
          </>
        )}

        {/* My Reviews Page */}
        {currentDashboardPage === "reviews" && (
          <>My reviews content goes here.</>
        )}

        {/* Settings Page */}
        {currentDashboardPage === "settings" && (
          <>Settings content goes here.</>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
