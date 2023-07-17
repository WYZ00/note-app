import "dotenv/config";
import env from "./utils/validateEnv";
import mongoose from "mongoose";
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log("Server is running on port:" + port);
    });
  })
  .catch(console.error);
