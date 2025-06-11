import express from "express";
import dotenv from "dotenv"; 
import connectDb from "./config/db.js";
import indexroute from "./routes/index.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connectDb();
app.use('/api',indexroute);
app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});