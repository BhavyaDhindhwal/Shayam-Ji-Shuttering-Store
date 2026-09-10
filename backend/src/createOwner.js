import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Owner from "./models/Owner.js";

async function createOwner() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    const name = "Shayam Ji Owner";
    const email = "bkdhindhwal143@gmail.com";
    const password = "2501350086@bullet";

    console.log("Checking owner email:", email);

    const existingOwner = await Owner.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingOwner) {
      console.log("Owner account already exists.");
      console.log("Database email:", existingOwner.email);
      await mongoose.disconnect();
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const owner = await Owner.create({
      name,
      email,
      passwordHash,
      isActive: true
    });

    console.log("Owner account created successfully.");
    console.log("Database email:", owner.email);

    await mongoose.disconnect();

  } catch (error) {
    console.error("Unable to create owner:", error.message);
    process.exit(1);
  }
}

createOwner();