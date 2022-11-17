import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

export const connectDb = (app) => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
};
