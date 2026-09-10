import { Router } from "express";

import {
  login,
  verifyOtp
} from "../controllers/authController.js";

const router = Router();


// Owner login
// POST /api/auth/login
router.post(
  "/login",
  login
);


// OTP verification
// POST /api/auth/verify-otp
router.post(
  "/verify-otp",
  verifyOtp
);


export default router;