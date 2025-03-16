import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json(); // Read JSON body

    if (!image) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 },
      );
    }

    // Upload to Cloudinary
    const uploadedResponse = await cloudinary.v2.uploader.upload(image, {
      folder: "reviews", // Optional: Stores in 'reviews' folder
      transformation: [{ width: 800, quality: "auto" }], // Optimize size
    });

    return NextResponse.json(
      { url: uploadedResponse.secure_url },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Upload failed", error },
      { status: 500 },
    );
  }
}
