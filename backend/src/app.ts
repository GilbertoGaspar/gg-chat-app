import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { defaultLimiter } from "./middlewares/rateLimiter.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

connectDB();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(compression());
app.use(express.json({ limit: "10kb" }));

app.use(defaultLimiter);

app.get("/api", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
