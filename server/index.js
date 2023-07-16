// import mongoose from "mongoose";
import { connectDB } from "./db/conn.js";

import express from "express";
const { PORT } = process.env;
import { serverError, passportMiddleware } from "./middleware/index.js";
import passport from "passport";
import { UserRouter } from "./Routes/user.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(passport.initialize());
passportMiddleware(passport);

app.use(express.json({ limit: "50mb" }));
app.use("/api", UserRouter);

const main = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

app.use(serverError);
