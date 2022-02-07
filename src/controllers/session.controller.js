const ms = require("ms");
const { createSession } = require("../services/Session.service");
const { validateUser } = require("../services/User.service");
const findRoles = require("../utils/findRoles");
const sequelize = require("../models")["sequelize"];
const {
  createAccessToken,
  createRefreshToken,
  reIssueAccessToken,
} = require("../utils/tokens");
process.env.NODE_ENV !== "production" && require("dotenv").config();

const createSessionHandler = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { email, password } = req.body;
    const userAgent = req.get("User-Agent") || "";
    const { userID, isAdmin } = await validateUser(email, password);

    if (!userID) {
      // error
      return res.sendStatus(401);
    }
    const session = await createSession(userID, userAgent, { transaction });
    if (!session) {
      // error
      await transaction.rollback();
      return res.sendStatus(500);
    }

    const roles = await findRoles(userID, isAdmin);

    const accessToken = createAccessToken(userID, roles, session.sessionID);
    const refreshToken = createRefreshToken(session.sessionID);
    if (!refreshToken || !accessToken) {
      throw new Error("Unable to create accessToken or RefreshToken");
    }

    res.cookie("text", "working", {
      sameSite: "none",
      secure: true,
    });

    res.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: ms(`${process.env.REFRESH_TOKEN_TTL}`),
      sameSite: "none",
      secure: true,
    });

    await transaction.commit();
    return res.status(200).json({ accessToken, roles });
  } catch (err) {
    console.log("err", err);
    await transaction.rollback();
    res.sendStatus(500);
  }
};

const refreshTokenHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.token;
    console.log(req.cookies.token);
    const { accessToken, roles } = await reIssueAccessToken(refreshToken);
    if (!accessToken) return res.sendStatus(401);
    return res.status(200).json({ accessToken, roles });
  } catch (err) {
    return res.sendStatus(500);
  }
};

module.exports = { createSessionHandler, refreshTokenHandler };
