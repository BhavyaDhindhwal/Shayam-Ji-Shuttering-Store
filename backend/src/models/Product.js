import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    // Size optional hai
    size: {
      type: String,
      default: null,
      trim: true
    },

    unit: {
      type: String,
      default: "piece",
      trim: true
    },

    totalQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    availableQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    issuedQuantity: {
      type: Number,
      default: 0,
      min: 0
    },

    returnedQuantity: {
      type: Number,
      default: 0,
      min: 0
    },

    damagedQuantity: {
      type: Number,
      default: 0,
      min: 0
    },

    rate: {
      type: Number,
      default: 0,
      min: 0
    },

    lowStockLimit: {
      type: Number,
      default: 10,
      min: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;