import User from "../models/userSchema.js";
// import bcrypt from 'bcrypt'


export const loginHandler = async(req, res, next) => {
    const { username, password } = req.body;
    res.console.log(username);
}

export const signUpHandler = async(req, res, next) => {

    const { username, password } = req.body;

    try {
        // const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password //: hashedPassword/
        });

        res.send('SAF;LKJHGKJ')
    } catch (error) {
        console.log(error)
    }


}