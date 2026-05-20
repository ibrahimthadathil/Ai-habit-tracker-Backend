import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "@/config/db";
import cors from "cors";
import { errorHandler, notFound } from "@/middleware/errorHandler";
import authRoute from "./routes/user/authRoutes";
const app = express();
dotenv.config();

const target = {
  origin: process.env.CLIENT_URL,
  changeOrigin: true,
  credentials: true,
};

app.use(cors(target));
app.use(express.json({limit:"1mb"}))
// app.get('/api/health',(req,res)=>{
//   res.json({status:"ok",time:new Date().toISOString()})
// })
app.use('/auth',authRoute)

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 4001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
