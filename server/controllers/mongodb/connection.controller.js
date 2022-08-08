import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

export const connectDb = (app) => {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_URL)
    .then(() =>
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((err) => console.log(err.message));
};
