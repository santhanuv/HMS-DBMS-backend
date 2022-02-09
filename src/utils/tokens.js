const jwtUtils = require("./jwtUtils");
process.env.NODE_ENV !== "production" && require("dotenv").config();
const sessionService = require("../services/Session.service");
const findRoles = require("../utils/findRoles");

const accessTokenTTL = process.env.ACCESS_TOKEN_TTL;
const refreshTokenTTL = process.env.REFRESH_TOKEN_TTL;
const inviteTokenTTL = process.env.INVITE_TOKEN_TTL;

const createAccessToken = (userID, roles, sessionID) => {
  try {
    if (!userID || !sessionID) throw new Error("No user ID or session ID");
    return jwtUtils.sign(
      { userID, roles, sessionID },
      { expiresIn: accessTokenTTL, algorithm: "RS256" }
    );
  } catch (e) {
    throw e;
  }
};

const createRefreshToken = (sessionID) => {
  try {
    if (!sessionID) throw new Error("No session ID");
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
    if (!refreshToken) throw new Error("No refresh token");

    verifyRes = jwtUtils.verify(refreshToken);
    if (!verifyRes?.valid) return false;

    const sessionID = verifyRes.decrypt.sessionID;
    const session = await sessionService.findSessionByID(sessionID);
    if (!session || !session?.userID) return false;

    const roles = await findRoles(session.userID);

    const accessToken = createAccessToken(
      session.userID,
      roles,
      session.sessionID
    );

    return { accessToken, roles };
  } catch (err) {
    throw err;
  }
};

const createInviteToken = (email) => {
  try {
    if (!email) throw new Error("Invalid email or role");
    return jwtUtils.sign(
      { email },
      { expiresIn: inviteTokenTTL, algorithm: "RS256" }
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  reIssueAccessToken,
  createInviteToken,
};
