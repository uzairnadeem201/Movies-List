import express from "express";
import dotenv from "dotenv"; 
import connectDb from "./config/db.js";
import indexroute from "./routes/index.js"
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true, // Allow cookies to be sent
}));
connectDb();
app.use('/api',indexroute);
app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});