const jwtUtils = require("./jwtUtils");
process.env.NODE_ENV !== "production" && require("dotenv").config();
const sessionService = require("../services/Session.service");

const accessTokenTTL = process.env.ACCESS_TOKEN_TTL;
const refreshTokenTTL = process.env.REFRESH_TOKEN_TTL;

const createAccessToken = (userID, sessionID) => {
  if (!userID || !sessionID) return false;
  try {
    return jwtUtils.sign(
      { userID, sessionID },
      { expiresIn: accessTokenTTL, algorithm: "RS256" }
    );
  } catch (e) {
    throw e;
  }
};

const createRefreshToken = (sessionID) => {
  if (!sessionID) return false;
  try {
    return jwtUtils.sign(
      { sessionID },
      { expiresIn: refreshTokenTTL, algorithm: "RS256" }
    );
  } catch (err) {
    throw err;
  }
};

const reIssueAccessToken = async (refreshToken) => {
  try {
    if (!refreshToken) return false;

    verifyRes = jwtUtils.verify(refreshToken);
    if (!verifyRes?.valid) return false;

    const sessionID = verifyRes.decrypt.sessionID;
    const session = await sessionService.findSessionByID(sessionID);
    if (!session) return false;
    const accessToken = createAccessToken(session.userID, session.sessionID);

    return accessToken;
  } catch (err) {
    throw err;
  }
};

module.exports = { createAccessToken, createRefreshToken, reIssueAccessToken };
