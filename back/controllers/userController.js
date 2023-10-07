import User from "../models/userSchema.js";
import bcrypt from 'bcrypt'

export const loginHandler = async(req, res, next) => {
    res.send('dsfsd')
}
export const signUpHandler = async(req, res, next) => {

    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });

        await user.save();
        res.send(user)
    } catch (error) {
        console.log(error)
    }


}