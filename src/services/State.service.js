const State = require("../models/index")["State"];

const findState = async (options) => {
  try {
    const stateRow = await State.findOne(options);
    if (stateRow) return stateRow.toJSON();
    else return null;
  } catch (err) {
    throw err;
  }
};

const findStateID = async (state) => {
  try {
    if (!state) return null;
    const stateRow = await State.findOne({ where: { state } });
    if (!stateRow) return null;
    return stateRow.toJSON().stateID;
  } catch (err) {
    throw err;
  }
};

const findStateName = async (stateID) => {
  try {
    if (!stateID) return null;
    const stateRow = await State.findOne({ where: { stateID } });
    if (!stateRow) return null;
    return stateRow.toJSON().state;
  } catch (err) {
    throw err;
  }
};

module.exports = { findState, findStateID, findStateName };
