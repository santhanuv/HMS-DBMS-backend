const Gender = require("../models/index")["Gender"];

const getAllGender = async () => {
  try {
    return await Gender.findAll({ attributes: ["gender"] });
  } catch (err) {
    throw err;
  }
};

const findGenderByID = async (genderID) => {
  try {
    if (!genderID) throw new Error("Invalid genderID");
    return await Gender.findOne({ where: { genderID } });
  } catch (err) {
    throw err;
  }
};

const findGenderByName = async (gender) => {
  try {
    if (!gender) throw new Error("Invalid gender");
    return await Gender.findOne({ where: { gender } });
  } catch (err) {
    throw err;
  }
};

module.exports = { findGenderByID, findGenderByName, getAllGender };
