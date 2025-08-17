import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_DB_URI || "";
    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export { connectDB };
