import User from "../models/userSchema.js";
import bcrypt from 'bcrypt'

export const loginHandler = async(req, res, next) => {
    res.send('dsfsd')
}
export const signUpHandler = async(req, res, next) => {

    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const user = new User({ username, password: hashedPassword });

        // Save the user to the database
        await user.save();
        res.send(user.username)
    } catch (error) {
        console.log(error)
    }


}