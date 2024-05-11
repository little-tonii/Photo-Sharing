const jwt = require("jsonwebtoken");
const cypto = require("crypto");

exports.generate = (payload) => {
  const key = process.env.REFRESH_TOKEN_KEY;
  const expire = process.env.REFRESH_TOKEN_EXPIRES;

  const token = jwt.sign(payload, key, { expiresIn: expire });

  return {
    refreshToken: token,
    refreshTokenHashed: cypto.createHash("sha256").update(token).digest("hex"),
  };
};
