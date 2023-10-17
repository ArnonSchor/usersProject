import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpHandler = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(200).json({ message: `Successfully created user ${user}` });
  } catch (error) {
    console.log(JWT_SECRET);
  }
};

export const loginHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    req.user = user;
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
    console.log("the token is:", token);
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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MmE0M2EyNjk5ZTBkYmU1OWUwMzYwMSIsInVzZXJuYW1lIjoiYXJub24iLCJwYXNzd29yZCI6IiQyYiQxMCRKem9rTVl2ZDQ4ck0wWjhxZUMuUHNlejQuUGdnQWQweFNvY0FyUTVMLmJKbHpPMVVGdlJIUyIsImVtYWlsIjoiYXJub25AYXJub24iLCJfX3YiOjB9LCJpYXQiOjE2OTc1MzY2MzZ9.htbXkeQ3tparUfSAzWAp_eH8cWwi6AKxVm3BEG1l_zk";

  // console.log(token);
  // console.log("authHeader:" + authHeader);
  // const token = authHeader && authHeader.split(" ")[1];
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
    console.log("token verified");
    next();
  });
};

export const listHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    res.status(200).json({ message: `hello ${username}` });
  } catch (error) {
    console.log(error);
  }
};
