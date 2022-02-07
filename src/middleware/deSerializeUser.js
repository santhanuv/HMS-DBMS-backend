const jwtUtils = require("../utils/jwtUtils");
const { reIssueAccessToken } = require("../utils/tokens");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return next();

  const [head, accessToken] = authHeader.split(" ");
  if (head !== "Bearer" || !accessToken) return next();

  const decryptedAT = jwtUtils.verify(accessToken);

  if (decryptedAT?.valid) {
    const { userID, roles, sessionID } = decryptedAT.decrypt;
    req.userID = decryptedAT.decrypt.userID;
    req.user = {
      userID,
      roles,
      sessionID,
    };
    return next();
  }
  req.user = null;
  return next();
};
