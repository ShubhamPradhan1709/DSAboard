import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { randomArrayGenerator } from "./utils";

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

app.get("/bst", async (_, res) => {
  let array = randomArrayGenerator();

  array.sort((a, b) => {
    return a - b;
  });

  const f = async (arr: number[]): Promise<number[]> => {
    if (arr.length > 1) {
      const midIndex = Math.floor((arr.length - 1) / 2);

      const mid = arr[midIndex];
      const left = arr.splice(0, midIndex);
      arr.splice(0, 1);
      const right = arr;

      return [mid, ...(await f(left)), ...(await f(right))];
    } else {
      return [...arr];
    }
  };

  array = await f(array);

  res.send({ array: array });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server ready at port: ${PORT}`));

