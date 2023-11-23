import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync.js";
import generateVerificationCode from "../services/generateVerificationCode.js";
import transporter from "../utils/transporter.js";
import generateToken from "../services/generateToken.js";
import { UNAUTHORIZED, BAD_REQUEST, OK } from "../constants/statusCodes.js";

let verificationCode;
export const signUpHandler = catchAsync(async (req, res, next) => {
  const { username, password, email } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(BAD_REQUEST).json({
      message: `there is already an account with the email: ${email} `,
    });
  }
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

  res.status(OK).json({ message: "Email sent!" });
});

export const verificationHandler = catchAsync(async (req, res, next) => {
  const { username, password, email, code } = req.body;
  if (code !== verificationCode) {
    res.status(BAD_REQUEST).json({ message: "Invalid verification code!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    username,
    password: hashedPassword,
    email,
  });
  res.status(OK).json({ message: "User created successfully" });
});

export const loginHandler = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(UNAUTHORIZED)
      .json({ error: "Invalid username or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(UNAUTHORIZED)
      .json({ error: "Invalid username or password" });
  }

  req.user = user;
  const token = generateToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });
  res.cookie("username", user.username, {
    httpOnly: true,
    secure: false,
  });
  res.json({ token: token });
});

export const TheSiteHandler = async (req, res, next) => {
  const username = req.cookies.username;
  try {
    res
      .status(OK)
      .json({ message: username ? `hello ${username}` : "hello guest" });
  } catch (error) {
    console.log(error);
  }
};
