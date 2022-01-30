import { Router } from "express";

const nodeArrayRouter = Router();

nodeArrayRouter.get("/", (_, res) => {
  const array = [];

  let size = Math.floor(Math.random() * 20);
  size += size <= 5 ? 5 : 0;

  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  res.send({
    data: {
      array: array,
    },
  });
});

export default nodeArrayRouter;
