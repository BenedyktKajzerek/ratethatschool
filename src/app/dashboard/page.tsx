"use client";

import { MyReviews } from "@/components/dashboard/MyReviews";
import { PendingRequests } from "@/components/dashboard/PendingRequests";
import { Settings } from "@/components/dashboard/Settings";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";

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
        {/* TODO visible only for admins */}
        {/* Pending Requests Page */}
        {currentDashboardPage === "requests" && <PendingRequests />}

        {/* My Reviews Page */}
        {currentDashboardPage === "reviews" && <MyReviews />}

        {/* Settings Page */}
        {currentDashboardPage === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default DashboardPage;
