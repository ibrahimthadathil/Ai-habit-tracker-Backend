import express from "express";
import dotenv from "dotenv";
import { connectDB } from "@/config/db";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4002;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
