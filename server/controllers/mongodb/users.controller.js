//import User from "../../models/mongodb/user.model";

export const controller = {};

controller.signIn = async (req, res) => {
  try {
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

controller.signUp = async (req, res) => {
  try {
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
