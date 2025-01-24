import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import courseRoute from "./routes/courseRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({});

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//  apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

app.get("/home", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the home page",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
