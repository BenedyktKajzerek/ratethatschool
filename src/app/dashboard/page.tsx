"use client";

import { MyReviews } from "@/components/dashboard/MyReviews";
import { PendingRequests } from "@/components/dashboard/PendingRequests";
import { Settings } from "@/components/dashboard/Settings";
import { useAuth } from "@/context/authContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { db } from "../../../firebaseConfig";
import { FaRegHeart } from "react-icons/fa";
import { LikedReviews } from "@/components/dashboard/LikedReviews";
import { SidebarButton } from "@/components/dashboard/SidebarButton";

const dashboardPages = [
  { id: "reviews", label: "My Reviews", icon: VscPreview },
  { id: "likes", label: "Liked Reviews", icon: FaRegHeart },
  { id: "settings", label: "Settings", icon: IoSettingsOutline },
];

const DashboardPage = () => {
  const [currentDashboardPage, setCurrentDashboardPage] = useState("reviews");
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    const checkAdmin = async () => {
      try {
        const adminsSnapshot = await getDocs(
          query(collection(db, "admins"), where("email", "==", user.email)),
        );

        setIsAdmin(!adminsSnapshot.empty);
        if (!adminsSnapshot.empty) setCurrentDashboardPage("requests");
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkAdmin();
  }, [user?.email]);

  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      {/* Sidebar */}
      <div className="flex w-full max-w-[250px] flex-col items-start space-y-2 pl-4 text-lg">
        {/* Pending requests section for admins */}
        {isAdmin && (
          <SidebarButton
            key="requests"
            icon={MdOutlinePendingActions}
            label="Pending Requests"
            active={currentDashboardPage === "requests"}
            onClick={() => setCurrentDashboardPage("requests")}
          />
        )}
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

      <div className="w-full min-w-0 max-w-[1200px] px-6">
        {/* Pending Requests Page */}
        {currentDashboardPage === "requests" && isAdmin && <PendingRequests />}

        {/* My Reviews Page */}
        {currentDashboardPage === "reviews" && <MyReviews />}

        {/* Liked Reviews Page */}
        {currentDashboardPage === "likes" && <LikedReviews />}

        {/* Settings Page */}
        {currentDashboardPage === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default DashboardPage;
