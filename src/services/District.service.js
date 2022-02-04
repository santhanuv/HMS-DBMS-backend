const District = require("../models/index")["District"];

const findDistrict = async (options, limitToOne = false) => {
  try {
    const districtRow = limitToOne
      ? await District.findOne(options)
      : await District.findAll(options);
    if (!districtRow) return null;
    return JSON.stringify(districtRow);
  } catch (err) {
    throw err;
  }
};

const findDistrictID = async (district, stateID) => {
  try {
    if (!district || !stateID) return null;
    const districtRow = await District.findOne({
      where: { district, stateID },
    });
    if (!districtRow) return null;
    return districtRow.toJSON().districtID;
  } catch (err) {
    throw err;
  }
};

const findDistrictName = async (districtID) => {
  try {
    if (!districtID) return;

    const districtRow = await District.findOne({ where: { districtID } });
    if (!districtRow) return null;
    else return districtRow.toJSON().district;
  } catch (err) {
    throw err;
  }
};

module.exports = { findDistrict, findDistrictID, findDistrictName };
