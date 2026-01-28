import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // wait up to 30s for MongoDB
    });

    console.log("DATABASE CONNECTED...");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
};

export default connectDB;
