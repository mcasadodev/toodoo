import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ENCRYPT METHODS - These should go on User.model.js when it's used
export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
export const matchPassword = async (formPassword, userPassword) => {
  return await bcrypt.compare(formPassword, userPassword);
};

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) res.json({ auth: false, message: "You failed to authenticate" });
  try {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      req.userId = decoded.id;
      next();
    });
  } catch (e) {
    res
      .clearCookie("token")
      .redirect("/")
      .json({ auth: false, message: "You failed to authenticate" })
      .end();
  }
};
