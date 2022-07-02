export const getRandomId = () => {
  const id = Math.floor(Math.random() * 1e16);

  return id.toString().replace(/\d{4}(?=.)/g, "$& ");
};
