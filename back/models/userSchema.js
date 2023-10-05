import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});


// userSchema.methods.speak = function speak() {
//     const greeting = this.name ?
//         'hi, i am ' + this.name :
//         'hi, i actually don\'t have a name';
//     res.json({
//         message: greeting
//     })
// }
const User = mongoose.model('User', userSchema);

export default User