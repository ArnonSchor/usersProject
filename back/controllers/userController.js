import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import catchAsync from "../utils/catchAsync.js";

let verificationCode;
export const signUpHandler = catchAsync(async (req, res, next) => {
  const { username, password, email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "schorarnon@gmail.com",
      pass: "xixd nvrn hlhp fyqa",
    },
  });

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  verificationCode = generateVerificationCode();

  const userVerificationCodes = {};

  userVerificationCodes[email] = verificationCode;
  const mailOptions = {
    from: "schorarnon@gmail.com",
    to: email,
    subject: "The Site Verification Code",
    html: `<h1>Your verification code is: ${verificationCode}</h1>`,
  };

  await transporter.sendMail(mailOptions);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    email,
  });

  res.status(200).json({ message: "User created successfully" });
});

export const verificationHandler = async (req, res, next) => {
  const { code } = req.body;
  if (code === verificationCode) {
    res.status(200).json({ message: "verification successful" });
  } else {
    res.status(400).json({ message: "Invalid verification code" });
  }
};

export const loginHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    req.user = user;
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ token: token });
  } catch (error) {
    console.log("there is an error authenticating:", error);
  }
};

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) {
    console.log("the token is null");
    return res.sendStatus(403);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("error verifying:", err);
      return res.status(403);
    }
    req.user = user;
    next();
  });
};

export const listHandler = async (req, res, next) => {
  const username = req.user.user.username;
  try {
    res
      .status(200)
      .json({ message: username ? `hello ${username}` : "hello guest" });
  } catch (error) {
    console.log(error);
  }
};
