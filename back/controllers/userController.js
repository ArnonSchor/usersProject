import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import generateVerificationCode from "../utils/generateVerificationCode.js";
import transporter from "../utils/transporter.js";

let verificationCode;
export const signUpHandler = catchAsync(async (req, res, next) => {
  const { username, password, email } = req.body;

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

  res.status(200).json({ message: "Email sent!" });
});

export const verificationHandler = catchAsync(async (req, res, next) => {
  const { username, password, email, code } = req.body;
  if (code !== verificationCode) {
    res.status(400).json({ message: "Invalid verification code!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    username,
    password: hashedPassword,
    email,
  });
  res.status(200).json({ message: "User created successfully" });
});

export const loginHandler = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  req.user = user;
  const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });
  res.json({ token: token });
});

export const authenticateToken = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) {
    console.log("the token is null");
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("error verifying:", err);
      return res.status(401);
    }
    req.user = user;
  });

  next();
});

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
