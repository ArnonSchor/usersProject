import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

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
    console.log(error);
  }
};

export const loginHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Invalid username or password");
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    req.user = user;
    next();
    return res.status(200).json({ message: "Successfully logged in" });
  } catch (error) {
    console.log(error);
  }
};
