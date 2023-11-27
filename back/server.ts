import express from "express";
import cors from "cors";
import connectToDB from "./connectToDB";
import userRouter from "./src/routes/usersRoute";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middlewares/errorHandler";

dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

connectToDB().catch((err: Error) => console.log(err));
``;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use(errorHandler);

app.listen(2000, () => console.log("server is up and running on port 2000"));
