import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { randomArrayGenerator } from "./ref/utils";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.send({ message: "DSA Board Server !" });
});

app.get("/array", (_, res) => {
  const values = randomArrayGenerator();
  res.send({ array: values });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server ready at port: ${PORT}`));
