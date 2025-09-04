import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { author, countryName, cityName, schoolName, reviewText } =
      await req.json();

    // configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"RateThatSchool" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Review Pending Approval",
      text: `New review by ${author} for ${schoolName} (${countryName}, ${cityName}) is waiting for approval.\n\n"${reviewText}"\n\nManage it here: https://www.ratethatschool.com/dashboard`,
      html: `<p>New review by <b>${author}</b> for <b>${schoolName}</b> (<b>${countryName}, ${cityName}</b>) is waiting for approval.</p>
       <p><i>"${reviewText}"</i></p>
       <p>Manage it here: <a href="https://www.ratethatschool.com/dashboard">Dashboard</a></p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
