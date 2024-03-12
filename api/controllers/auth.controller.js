import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password, fullName, phoneNumber } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !fullName ||
    !phoneNumber ||
    username === "" ||
    email === "" ||
    password === "" ||
    fullName === ""
  ) {
    next(errorHandler(400,'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = User({
    username,
    email,
    password: hashedPassword,
    fullName,
    phoneNumber,
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};
