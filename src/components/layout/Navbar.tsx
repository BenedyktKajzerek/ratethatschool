"use client";

import React, { useEffect, useState } from "react";
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

const SOCIAL_MEDIA = [
  {
    link: "https://www.instagram.com/benedykt_kajzerek/",
    icon: FaInstagram,
  },
  {
    link: "https://x.com/benedykt_",
    icon: FaXTwitter,
  },
  {
    link: "https://www.tiktok.com/@benedykt_",
    icon: RiTiktokLine,
  },
];

const navbarIconSize = 24;

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Close mobile navbar when screen size >= 768
  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsNavbarOpen(false);
    };

    window.addEventListener("resize", handler);

    return () => {
      removeEventListener("resize", handler);
    };
  }, []);

  function isScreenSmall() {
    return window.innerWidth < 768;
  }

  return (
    <>
      <header>
        <nav className="top-0 z-[100] bg-white text-black">
          <div
            className={`${isNavbarOpen ? "flex-col" : "flex-row"} relative flex items-center justify-between p-6`}
          >
            {/* Social Media Icons */}
            <div
              className={`${isNavbarOpen ? "my-6 flex" : "hidden"} space-x-6 md:flex`}
            >
              {SOCIAL_MEDIA.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link key={index} href={social.link} target="_blank">
                    <Icon size={24} />
                  </Link>
                );
              })}
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="-order-1 text-3xl font-bold md:order-none"
            >
              RateMy<span className="text-primary">Schools</span>
            </Link>

            <div
              className={`${isNavbarOpen ? "block" : "hidden"} space-x-2 md:flex`}
            >
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

            {/* Navbar hamburger */}
            <button
              onClick={() => {
                setIsNavbarOpen((prev) => !prev);
              }}
              className="absolute right-6 z-[999] block md:hidden"
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
