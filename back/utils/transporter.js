import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "schorarnon@gmail.com",
    pass: "xixd nvrn hlhp fyqa",
  },
});
export default transporter;
