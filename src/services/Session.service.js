const Session = require("../models/index")["Valid_Session"];

const createSession = async (userID, userAgent = "", options) => {
  try {
    if (!userID) return -1;
    const session = await Session.create({ userID, userAgent }, options);
    if (!session) return null;
    return session.toJSON();
  } catch (err) {
    throw err;
  }
};

const findSessions = async (options) => {
  try {
    if (!options) throw new Error("No options given");
    return await Session.findAll(options);
  } catch (err) {
    throw err;
  }
};

const findSessionByID = async (sessionID) => {
  try {
    if (!sessionID) return;
    const session = await Session.findOne({ where: { sessionID } });
    if (!session) return null;
    return session.toJSON();
  } catch (err) {
    throw err;
  }
};

const deleteSessionByID = async (sessionID, options) => {
  try {
    if (!sessionID) throw new Error("Invalid sessionID");
    return await Session.destroy({ where: { sessionID } }, options);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createSession,
  findSessions,
  findSessionByID,
  deleteSessionByID,
};
