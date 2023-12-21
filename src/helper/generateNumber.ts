export const generateNumber = (limit: number, isDemoCode = true) => {
  if (isDemoCode) {
    return 1234;
  } else {
    return Math.floor(1000 + Math.random() * 9000);
  }
};
