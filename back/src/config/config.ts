import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET, REFRESH_SECRET } = process.env;

export const config = {
  auth: {
    jwtSecret: JWT_SECRET,
    refreshSecret: REFRESH_SECRET,
  },
};
