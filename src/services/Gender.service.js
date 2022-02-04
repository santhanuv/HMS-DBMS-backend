const Gender = require("../models/index")["Gender"];

const findGenderID = async (gender) => {
  try {
    if (!gender) return;
    const genderRow = await Gender.findOne({ where: { gender } });
    if (!genderRow) return null;
    return genderRow.toJSON().genderID;
  } catch (err) {
    throw err;
  }
};

const findGenderName = async (genderID) => {
  try {
    if (!genderID) return;
    const genderRow = await Gender.findOne({ where: { genderID } });
    if (!genderRow) return null;
    return genderRow.toJSON().gender;
  } catch (err) {
    throw err;
  }
};

module.exports = { findGenderID, findGenderName };
