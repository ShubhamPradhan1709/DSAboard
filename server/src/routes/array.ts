import { Router } from "express";
import { randomArrayGenerator } from "../utils";

const nodeArrayRouter = Router();

nodeArrayRouter.get("/", (_, res) => {
  const array = randomArrayGenerator();

  res.send({
    data: {
      array: array,
    },
  });
});

export default nodeArrayRouter;
