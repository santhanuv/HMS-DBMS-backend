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

const findSession = async (options) => {
  try {
    if (!options) return;
    const session = await Session.findOne(options);
    return JSON.stringify(session);
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
  findSession,
  findSessionByID,
  deleteSessionByID,
};
