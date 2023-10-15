import express from "express";
import cors from "cors";
import connectToDB from "./connectToDB.js";
import userRouter from "./routes/usersRoute.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

connectToDB().catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);

app.listen(2000, () => console.log("server is up and running on port 2000"));
