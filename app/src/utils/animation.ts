/** wait for some miliseconds */
export const pause = async (time: number = 500) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
