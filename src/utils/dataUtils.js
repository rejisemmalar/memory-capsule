export const isUnlocked = (openDate) => {
  return new Date() >= new Date(openDate);
};
