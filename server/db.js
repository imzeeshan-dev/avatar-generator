import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db Connected");
  } catch (err) {
    console.error("Error connecting to the Databases:", err);
  }
};

export default connectDB;
