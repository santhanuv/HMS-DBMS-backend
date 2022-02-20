const User = require("../models/index")["User"];
const ms = require("ms");
const {
  createSession,
  deleteSessionByID,
  findSessions,
} = require("../services/Session.service");
const { validateUser } = require("../services/User.service");
const findRoles = require("../utils/findRoles");
const sequelize = require("../models")["sequelize"];
const {
  createAccessToken,
  createRefreshToken,
  reIssueAccessToken,
} = require("../utils/tokens");
const { verify } = require("../utils/jwtUtils");
process.env.NODE_ENV !== "production" && require("dotenv").config();

const createSessionHandler = async (req, res) => {
  try {
    const userAgent = req.get("User-Agent");
    if (req.body.email && userAgent) {
      const [session] = await findSessions({
        include: {
          model: User,
          attributes: [],
          where: { email: req.body.email },
        },
        attributes: ["sessionID"],
        where: { userAgent: `${userAgent}` },
      });
      if (session?.dataValues) {
        const deleRes = await deleteSessionByID(session.dataValues?.sessionID);
        console.log(
          "Session Deleted: sessionID: ",
          session.dataValues?.sessionID,
          " Result: ",
          deleRes
        );
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({ msg: "Unable to relogin" }).status(500);
  }

  const transaction = await sequelize.transaction();
  try {
    const { email, password, role: requiredRole } = req.body;
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
    console.log("finded roles: ", roles);
    if (roles.length === 0) {
      console.log("Unable to find the roles");
      return res.sendStatus(500);
    }

    if (roles.indexOf(requiredRole) === -1) {
      await transaction.rollback();
      return res.sendStatus(401);
    }

    const accessToken = createAccessToken(userID, roles, session.sessionID);
    const refreshToken = createRefreshToken(session.sessionID);
    if (!refreshToken || !accessToken) {
      throw new Error("Unable to create accessToken or RefreshToken");
    }

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

const deleteSessionHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.token;
    const user = req.user;
    if (!refreshToken && !user?.sessionID) return res.sendStatus(401);

    const verified = (refreshToken && verify(refreshToken)) || null;
    const sessionID =
      (verified?.valid && verified?.decrypt?.sessionID) || user?.sessionID;

    if (!sessionID) return res.sendStatus(401);
    const isDeleted = await deleteSessionByID(sessionID);
    if (!isDeleted) throw new Error("Unable to logout");

    if (!verified.valid) return res.sendStatus(401);
    else return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const refreshTokenHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.token;
    const { accessToken, roles } = await reIssueAccessToken(refreshToken);
    if (!accessToken) return res.sendStatus(401);
    return res.status(200).json({ accessToken, roles });
  } catch (err) {
    return res.sendStatus(500);
  }
};

module.exports = {
  createSessionHandler,
  refreshTokenHandler,
  deleteSessionHandler,
};
