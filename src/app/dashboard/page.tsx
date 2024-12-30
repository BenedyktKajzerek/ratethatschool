import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push("/"); // Redirect to the homepage if not admin
    }
  }, [isAdmin, router]);

  return (
    <>
      <div>Admin</div>
      <div>Dashboard</div>
    </>
  );
};

export default DashboardPage;
