import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation basic one only for learning purposes (There can be a lot of them)
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All Fields are important to be filled !!!" });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User Already Exists !" });
    }

    // Now Create a user after (all validations) ->
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User creatation Success",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Interanl server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    //check if user alredy exists
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(400).json({
        message: "Email/User Not Found !!",
      });
    }

    //compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password not matched !!!" });
    }

    res.status(200).json({
      message: "User Logged IN !!!",
      user: {
        id: user._id,
        email: user.email,
        UserName: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Issue Occured !!!" });
  }
};

const logoutuser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User LogOut Success" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error !!!" });
  }
};

export { registerUser, loginUser, logoutuser };
