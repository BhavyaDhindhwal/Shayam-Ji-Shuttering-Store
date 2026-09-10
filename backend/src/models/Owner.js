import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    name: {
      
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    otpHash: {
      type: String,
      default: null
    },

    otpExpiresAt: {
      type: Date,
      default: null
    },

    otpAttempts: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;