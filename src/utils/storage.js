export const saveCapsule = (capsules) => {
  localStorage.setItem("capsules", JSON.stringify(capsules));
};

export const getCapsules = () => {
  return JSON.parse(localStorage.getItem("capsules")) || [];
};
