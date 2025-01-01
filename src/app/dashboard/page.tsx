"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to the homepage if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      <div>Admin</div>
      <div>Dashboard</div>
    </>
  );
};

export default DashboardPage;
