import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.send({ message: "DSA Board Server !" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server ready at port: ${PORT}`));
