import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Owner from "../models/Owner.js";

import {
  generateOtp,
  hashOtp,
  compareOtp,
  sendOtpEmail
} from "../services/otpService.js";

const OTP_MINUTES = Number(
  process.env.OTP_EXPIRES_MINUTES || 5
);


// ==========================================
// STEP 1: OWNER LOGIN
// Email + Password → OTP
// ==========================================

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    // Find owner
    const owner = await Owner.findOne({
      email: email.toLowerCase().trim()
    });
n
    // Owner not found / inactive
    if (!owner || !owner.isActive) {
      return res.status(401).json({
        message: "Invalid login."
      });
    }

    // Check password
    const passwordOk = await bcrypt.compare(
      password,
      owner.passwordHash
    );
    console.log("Owner found:", owner.email);
    console.log("Password matched:", passwordOk);

    if (!passwordOk) {
      return res.status(401).json({
        message: "Invalid login."
      });
    }

    // Generate OTP
    const otp = generateOtp();

    // Hash OTP before saving
    owner.otpHash = await hashOtp(otp);

    // OTP expiry
    owner.otpExpiresAt = new Date(
      Date.now() + OTP_MINUTES * 60 * 1000
    );

    // Reset attempts
    owner.otpAttempts = 0;

    await owner.save();
    
    console.log("Sending OTP to:", owner.email);

try {
  await sendOtpEmail(owner.email, otp);
  console.log("OTP email sent successfully");
} catch (emailError) {
  console.error("OTP EMAIL ERROR:", emailError);
  throw emailError;
}
    return res.json({
      message: "OTP sent to the registered owner Gmail.",
      otpRequired: true
    });

  } catch (error) {

    console.error("Login error:", error);

    return res.status(500).json({
      message: "Unable to start login."
    });
  }
}


// ==========================================
// STEP 2: VERIFY OTP
// OTP → JWT → Dashboard Access
// ==========================================

export async function verifyOtp(req, res) {
  try {

    const { email, otp } = req.body;

    const owner = await Owner.findOne({
      email: email?.toLowerCase().trim()
    });

    // OTP request not found
    if (
      !owner ||
      !owner.otpHash ||
      !owner.otpExpiresAt
    ) {
      return res.status(400).json({
        message: "OTP request not found."
      });
    }

    // OTP expired
    if (owner.otpExpiresAt < new Date()) {

      return res.status(400).json({
        message: "OTP expired. Please login again."
      });
    }

    // Maximum attempts
    if (owner.otpAttempts >= 5) {

      return res.status(429).json({
        message: "Too many OTP attempts. Please login again."
      });
    }

    // Increase attempt count
    owner.otpAttempts += 1;

    // Compare OTP
    const valid = await compareOtp(
      String(otp),
      owner.otpHash
    );

    if (!valid) {

      await owner.save();

      return res.status(401).json({
        message: "Invalid OTP."
      });
    }

    // OTP successfully verified
    owner.otpHash = null;
    owner.otpExpiresAt = null;
    owner.otpAttempts = 0;

    await owner.save();

    // Create login token
    const token = jwt.sign(
      {
        sub: owner._id.toString(),
        role: "owner",
        email: owner.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h"
      }
    );

    return res.json({
      message: "Login successful.",
      token
    });

  } catch (error) {

    console.error("OTP verification error:", error);

    return res.status(500).json({
      message: "Unable to verify OTP."
    });
  }
}