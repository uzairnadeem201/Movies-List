import mongoose from "mongoose";
import dotenv from "dotenv"; 
dotenv.config(); 
const connectDb = () => {mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });
}
export default connectDb;
