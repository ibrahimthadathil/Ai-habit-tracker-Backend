import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1","8.8.8.8"])
export const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    if (!url) throw new Error("MONGO_URL is not defined");
    const connect = await mongoose.connect(url);
    console.log(`{MongoDb connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
    
    console.log("MongoDb connection error:", (err as Error).message);
    process.exit(1);
  }
};
 