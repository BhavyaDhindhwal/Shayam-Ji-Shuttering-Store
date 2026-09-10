import { Router } from "express";
import Product from "../models/Product.js";

console.log("PRODUCT ROUTES FILE LOADED");

const router = Router();
// ==========================================
// GET ALL PRODUCTS
// ==========================================

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true
    }).sort({ createdAt: -1 });

    res.json(products);

  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Unable to fetch products."
    });
  }
});


// ==========================================
// ADD NEW PRODUCT
// ==========================================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      size,
      unit,
      totalQuantity,
      rate,
      lowStockLimit
    } = req.body;

    // Product name required
    if (!name) {
      return res.status(400).json({
        message: "Product name is required."
      });
    }

    // Quantity required
    if (
      totalQuantity === undefined ||
      totalQuantity === null ||
      totalQuantity < 0
    ) {
      return res.status(400).json({
        message: "Valid total quantity is required."
      });
    }

    const product = await Product.create({
      name,
      size: size || null,
      unit: unit || "piece",

      totalQuantity,

      // New product ki complete quantity available hogi
      availableQuantity: totalQuantity,

      issuedQuantity: 0,
      returnedQuantity: 0,
      damagedQuantity: 0,

      rate: rate || 0,
      lowStockLimit: lowStockLimit ?? 10,

      isActive: true
    });

    res.status(201).json({
      message: "Product added successfully.",
      product
    });

  } catch (error) {
    console.error("Add product error:", error);

    res.status(500).json({
      message: "Unable to add product."
    });
  }
});


// ==========================================
// GET SINGLE PRODUCT
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found."
      });
    }

    res.json(product);

  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      message: "Unable to fetch product."
    });
  }
});


// ==========================================
// UPDATE PRODUCT
// ==========================================

router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      size,
      unit,
      totalQuantity,
      rate,
      lowStockLimit
    } = req.body;

    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found."
      });
    }

    if (name !== undefined) {
      product.name = name;
    }

    if (size !== undefined) {
      product.size = size || null;
    }

    if (unit !== undefined) {
      product.unit = unit;
    }

    if (rate !== undefined) {
      product.rate = rate;
    }

    if (lowStockLimit !== undefined) {
      product.lowStockLimit = lowStockLimit;
    }

    // Total quantity change
    if (totalQuantity !== undefined) {

      if (totalQuantity < product.issuedQuantity) {
        return res.status(400).json({
          message:
            "Total quantity cannot be less than currently issued quantity."
        });
      }

      product.totalQuantity = totalQuantity;

      // Available = Total - Issued - Damaged
      product.availableQuantity =
        totalQuantity -
        product.issuedQuantity -
        product.damagedQuantity;
    }

    await product.save();

    res.json({
      message: "Product updated successfully.",
      product
    });

  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      message: "Unable to update product."
    });
  }
});


// ==========================================
// DELETE PRODUCT
// ==========================================

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found."
      });
    }

    // Hard delete nahi karenge.
    // Product ko inactive karenge.
    product.isActive = false;

    await product.save();

    res.json({
      message: "Product removed successfully."
    });

  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      message: "Unable to remove product."
    });
  }
});


export default router;