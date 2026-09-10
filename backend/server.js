import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "Shayam Ji Shuttering Store API is running"
  });
});

app.use("/api/auth", authRoutes);
app.get("/api/products-test", (req, res) => {
  res.json({
    ok: true,
    message: "Product route test working"
  });
});
app.use("/api/products", productRoutes);
console.log("PRODUCT ROUTES LOADED");
// Server port
const PORT = process.env.PORT || 5000;

// Start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();