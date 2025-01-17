"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiTiktokLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/authContext";
import { logoutUser } from "@/utils/auth";
import { ModalAuth } from "./ModalAuth";

const navbarIconSize = 24;

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Logged out successfully:");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <header>
        <nav className="top-0 z-[100] bg-white text-black">
          <div className="flex items-center justify-between p-6">
            {/* Social Media Icons */}
            <div className="hidden space-x-6 md:flex">
              <Link href="https://www.instagram.com/" target="_blank">
                <FaInstagram size={navbarIconSize} />
              </Link>

              <Link href="https://x.com/" target="_blank">
                <FaXTwitter size={navbarIconSize} />
              </Link>

              <Link href="https://tiktok.com/" target="_blank">
                <RiTiktokLine size={navbarIconSize} />
              </Link>
            </div>

            {/* Logo */}
            <Link href="/" className="text-3xl font-bold">
              RateMy<span className="text-primary">Schools</span>
            </Link>

            <div className="hidden space-x-2 md:flex">
              {user ? (
                <>
                  <Link href={"/dashboard"}>
                    <Button>Dashboard</Button>
                  </Link>
                  <Button onClick={handleLogout}>Sign Out</Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>

            {isNavbarOpen && <div>Mobile Navbar</div>}

            {/* Navbar hamburger */}
            <button
              onClick={() => {
                setIsNavbarOpen((prev) => !prev);
              }}
              className="z-[999] block md:hidden"
            >
              {isNavbarOpen ? (
                <IoClose size={navbarIconSize} />
              ) : (
                <LuMenu size={navbarIconSize} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Modal */}
      <ModalAuth isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
