import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export function generateOtp() {
  return String(crypto.randomInt(100000, 1000000));
}

export function hashOtp(otp) {
  return bcrypt.hash(otp, 10);
}

export function compareOtp(otp, hash) {
  return bcrypt.compare(otp, hash);
}

export async function sendOtpEmail(to, otp) {

  // Check SMTP configuration
  if (!process.env.SMTP_USER) {
    throw new Error("SMTP_USER is missing in .env");
  }

  if (!process.env.SMTP_APP_PASSWORD) {
    throw new Error("SMTP_APP_PASSWORD is missing in .env");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_APP_PASSWORD
    }
  });

  // Check Gmail connection before sending
  await transporter.verify();

  await transporter.sendMail({
    from: `"Shayam Ji Shuttering Store" <${process.env.SMTP_USER}>`,
    to: to,

    subject: "Shayam Ji Shuttering Store - Owner Login OTP",

    text: `Your owner login OTP is ${otp}.

This OTP is valid for ${
      process.env.OTP_EXPIRES_MINUTES || 5
    } minutes.

If you did not request this OTP, please ignore this email.`
  });

  console.log("OTP email sent successfully to:", to);
}