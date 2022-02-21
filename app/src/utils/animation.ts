import board from "../lib/Board";

/** wait for some miliseconds */
export const pause = async () => {
  return new Promise((resolve) => setTimeout(resolve, board.speed));
};
