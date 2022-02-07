const jwtUtils = require("../utils/jwtUtils");
const { reIssueAccessToken } = require("../utils/tokens");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return next();

  const [head, accessToken] = authHeader.split(" ");
  if (head !== "Bearer" || !accessToken) return next();

  const decryptedAT = jwtUtils.verify(accessToken);

  if (decryptedAT?.valid) {
    req.userID = decryptedAT.decrypt.userID;
    return next();
  }
  req.userID = null;
  return next();
};
