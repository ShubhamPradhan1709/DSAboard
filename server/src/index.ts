import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use("/", router);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`🚀 Server ready at port: ${PORT}`));
