import User from "../models/userSchema.js";
import bcrypt from 'bcrypt'

export const loginHandler = async(req, res, next) => {
    const { username, password } = req.body;
}
export const signUpHandler = async(req, res, next) => {

    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });

        await user.save();
        res.redirect('http://localhost:5173/');

    } catch (error) {}


}