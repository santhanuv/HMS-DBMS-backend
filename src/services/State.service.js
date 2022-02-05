const State = require("../models/index")["State"];

const findState = async (options) => {
  try {
    if (!options) throw new Error("Invalid options");
    return await State.findOne(options);
  } catch (err) {
    throw err;
  }
};

const findStateByID = async (stateID) => {
  try {
    if (!stateID) throw new Error("Invalid stateID");
    return await State.findOne({ where: { stateID } });
  } catch (err) {
    throw err;
  }
};

const findStateByName = async (state) => {
  try {
    if (!state) throw new Error("Invalid State");
    return await State.findOne({ where: { state } });
  } catch (err) {
    throw err;
  }
};

module.exports = { findState, findStateByID, findStateByName };
