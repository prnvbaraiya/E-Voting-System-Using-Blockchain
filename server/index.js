import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Auth from "./Routes/AuthRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(cors());
app.use("/api/auth", Auth);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected With DB Successfull"))
  .catch((e) => console.log("Db Connection Failed"));

app.listen(port, () => {
  console.log(`Server is Listening on PORT ${port}`);
});
