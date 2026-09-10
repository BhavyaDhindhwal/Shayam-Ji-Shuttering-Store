import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Owner from "./models/Owner.js";

async function resetOwnerPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    // YAHAN wahi owner Gmail likho
    // jo login ke time use kar rahe ho.
    const email = "bkdhindhwal143@gmail.com";

    // YAHAN naya password set karo.
    const newPassword = "2501350086@bullet";

    const owner = await Owner.findOne({
      email: email.toLowerCase().trim()
    });

    if (!owner) {
      console.log("Owner account not found.");
      await mongoose.disconnect();
      return;
    }

    owner.passwordHash = await bcrypt.hash(newPassword, 12);

    await owner.save();

    console.log("Owner password updated successfully.");
    console.log("Login email:", owner.email);

    await mongoose.disconnect();

  } catch (error) {
    console.error("Password reset failed:", error.message);
    process.exit(1);
  }
}

resetOwnerPassword();