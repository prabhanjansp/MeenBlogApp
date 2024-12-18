import User from "../modules/user.js";
import bcryptjs from "bcrypt"
import { errorHandler } from "../util/error.js";
export const signup = async (req, res,next) => {
  //   console.log(req.body);

  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === " " ||
    email === " " ||
    password === " "
  ) {
    // return res.status(400).json({ message: "All fields are required" });
    next(errorHandler( 400, "All fields are mandatory"))
  }
  const hashPasswoed = bcryptjs.hashSync(password, 10)
  const freshuser = new User({ username: username, email: email, password: hashPasswoed });
  // /saving the user to database
  try {
    await freshuser.save();
    res.json({ message: "Signup done" });
  } catch (error) {
    next(error)
  }
};
