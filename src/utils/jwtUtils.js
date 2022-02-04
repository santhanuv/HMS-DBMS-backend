const jwt = require("jsonwebtoken");
process.env.NODE_ENV !== "production" && require("dotenv").config();
const privateKey = Buffer.from(process.env.PRIVATE_KEY, "base64").toString(
  "ascii"
);
const publicKey = Buffer.from(process.env.PUBLIC_KEY, "base64").toString(
  "ascii"
);
const sign = (data, options) => {
  try {
    return jwt.sign(data, privateKey, options);
  } catch (err) {
    throw err;
  }
};

const verify = (token) => {
  try {
    const decrypt = jwt.verify(token, publicKey);
    return { valid: true, expired: false, decrypt };
  } catch (err) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decrypt: null,
    };
  }
};

module.exports = { sign, verify };
