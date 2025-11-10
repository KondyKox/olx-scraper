import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import connectDB from "./config/db.js";
import scrapeRoute from "./routes/scrapeRoute.js";
import saveRoute from "./routes/saveRoute.js";
import savedRoute from "./routes/savedRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// connectDB();

app.use("/api", scrapeRoute);
app.use("/api", saveRoute);
app.use("/api", savedRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
