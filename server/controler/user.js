import { User } from "../Models/index.js";
import { BadRequest, logIn } from "../middleware/index.js";
import "dotenv/config";

// Twitter

//Sign up
export const singUp = async (req, res) => {
  // console.log("req.body", req.body);
  const { firstName, lastName, email, password } = req.body;
  const CheackUser = await User.findOne({ email });
  if (CheackUser) {
    throw new BadRequest("User Already Exist");
  }
  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });
  await user.save();
  res.status(201).json({
    success: true,
    message: "user create successfully",
  });
};

// login
export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (![email, password].every(Boolean))
    throw new BadRequest("Please fill all inputs!");

  const user = await User.findOne({ email });
  console.log(user);

  if (!user || !(await user.matchesPassword(password))) {
    throw new BadRequest("Incorrect email or password");
  }
  res.status(200).json({
    success: true,
    message: "Login Successflly!",
    user,
  });
};
