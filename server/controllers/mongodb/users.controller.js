import User from "../../models/mongodb/user.model";
import jwt from "jsonwebtoken";

export const controller = {};

controller.signIn = async (req, res) => {
  const messages = [];
  const errors = [];
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    errors.push({ text: "User not found" });
  }
  if (errors.length > 0) {
    res.send(errors);
  } else {
    const match = await user.matchPassword(password, user.password);
    if (match) {
      const id = user._id;
      const token = jwt.sign({ id }, "jwtSecret", {
        expiresIn: 300,
      });
      res.json({ auth: true, token, result: user });
    } else {
      res.json({ auth: false });
    }
  }
};

controller.signUp = async (req, res) => {
  try {
    const messages = [];
    const errors = [];
    const { name, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      errors.push({ text: "Passwords do not match" });
    }
    if (password.length < 4) {
      errors.push({ text: "Passwords must be at least 4 characters" });
    }
    if (errors.length > 0) {
      res.send(errors);
    } else {
      const emailUser = await User.findOne({ email: email });
      if (emailUser) {
        messages.push({ text: "Email already exists" });
        res.send(messages);
      } else {
        messages.push({ text: "New user created" });
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.send(messages);
        //res.send(messages).redirect("../");
      }
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

controller.logOut = async (req, res) => {
  try {
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
