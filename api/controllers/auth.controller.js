import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
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
    return res.status(400).json({ message: "All fields are required" });
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
    res.status(500).json({ message: error.message });
  }
};
