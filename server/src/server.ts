import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import scrapeRoute from "./routes/scrapeRoute";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", scrapeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
