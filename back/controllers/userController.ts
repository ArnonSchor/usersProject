import User from "../models/userSchema";
import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync";
import generateVerificationCode from "../services/generateVerificationCode";
import transporter from "../utils/transporter";
import generateToken from "../services/generateToken";
import { UNAUTHORIZED, BAD_REQUEST, OK } from "../constants/statusCodes";
import { NextFunction, Request, Response } from "express";

let verificationCode: string;
export const signUpHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(BAD_REQUEST).json({
        message: `there is already an account with the email: ${email} `,
      });
    }
    verificationCode = generateVerificationCode();

    const mailOptions = {
      from: "schorarnon@gmail.com",
      to: email,
      subject: "The Site Verification Code",
      html: `<h1>Your verification code is: ${verificationCode}</h1>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(OK).json({ message: "Email sent!" });
  }
);

export const verificationHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, code } = req.body;
    if (code !== verificationCode) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Invalid verification code!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
      email,
    });
    res.status(OK).json({ message: "User created successfully" });
  }
);

export const loginHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .json({ error: "Invalid username or password" });
    }
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(UNAUTHORIZED)
        .json({ error: "Invalid username or password" });
    }

    req.body.user = user;
    console.log(user);
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
  }
);

export const TheSiteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.cookies.username;
  try {
    res
      .status(OK)
      .json({ message: username ? `hello ${username}` : "hello guest" });
  } catch (error) {
    console.log(error);
  }
};
