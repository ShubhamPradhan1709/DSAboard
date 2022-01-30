
export const randomArrayGenerator = () => {
  const array = [];

  let size = Math.floor(Math.random() * 20);
  size += size <= 5 ? 5 : 0;

  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  return array;
};

