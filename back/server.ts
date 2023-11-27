import express from "express";
import cors from "cors";
import connectToDB from "./connectToDB";
import userRouter from "./src/routes/usersRoute";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middlewares/errorHandler";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
dotenv.config();

const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "too many requests from this IP, please try again in an hour",
});
app.use(limiter);

app.use(helmet());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

connectToDB().catch((err: Error) => console.log(err));

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use(hpp());

app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);

app.use(errorHandler);

app.listen(2000, () => console.log("server is up and running on port 2000"));
