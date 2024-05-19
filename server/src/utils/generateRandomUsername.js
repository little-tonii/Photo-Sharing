module.exports = function () {
  const random = crypto.randomUUID();
  return random.split("-").join("");
};
