const ms = require("ms");
const { createSession } = require("../services/Session.service");
const { validateUser } = require("../services/User.service");
const {
  createAccessToken,
  createRefreshToken,
  reIssueAccessToken,
} = require("../utils/tokens");
process.env.NODE_ENV !== "production" && require("dotenv").config();

const createSessionHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAgent = req.get("User-Agent") || "";
    const userID = await validateUser(email, password);
    if (!userID) {
      // error
      return res.sendStatus(401);
    }
    const session = await createSession(userID, userAgent);
    if (!session) {
      // error
      return res.sendStatus(500);
    }
    const accessToken = createAccessToken(userID, session.sessionID);
    const refreshToken = createRefreshToken(session.sessionID);
    if (!refreshToken || !accessToken) {
      return res.sendStatus(500);
    }
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: ms(`${process.env.REFRESH_TOKEN_TTL}`),
    });
    return res.status(200).json({ accessToken });
  } catch (err) {
    res.sendStatus(500);
  }
};

const refreshTokenHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const accessToken = await reIssueAccessToken(refreshToken);
    if (!accessToken) return res.sendStatus(401);
    return res.status(200).json({ accessToken });
  } catch (err) {
    return res.sendStatus(500);
  }
};

module.exports = { createSessionHandler, refreshTokenHandler };
