import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { AuthProvider } from "@/context/authContext";

const poppins = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RateThatSchool - Your resource for schools reviews",
  description:
    "Discover school reviews, ratings, and recommendations from students worldwide on RateThatSchool. Share your experiences and help others find the best schools.",
  keywords: [
    "RateThatSchool",
    "school reviews",
    "school ratings",
    "college reviews",
    "university reviews",
    "school recommendations",
  ],
  applicationName: "RateThatSchool",
  metadataBase: new URL("https://ratethatschool.com"),
  alternates: {
    canonical: "https://ratethatschool.com",
  },
  openGraph: {
    type: "website",
    url: "https://ratethatschool.com",
    title: "RateThatSchool - Your resource for schools reviews",
    siteName: "RateThatSchool",
    description:
      "Discover school reviews, ratings, and recommendations from students worldwide on RateThatSchool. Share your experiences and help others find the best schools.",
    images: [
      {
        url: "https://ratethatschool.com/opengraph-img.png",
        width: 1200,
        height: 630,
        alt: "RateThatSchool - Your resource for schools reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@benedykt_",
    title: "RateThatSchool - Your resource for schools reviews",
    description:
      "Discover school reviews, ratings, and recommendations from students worldwide on RateThatSchool. Share your experiences and help others find the best schools.",
    images: ["https://ratethatschool.com/opengraph-img.png"],
  },
  icons: {
    icon: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${poppins.className} antialiased`}>
          <Navbar />

          <main className="overflow-hidden">{children}</main>

          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
