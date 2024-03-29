const District = require("../models/index")["District"];
const State = require("../models/index")["State"];

const findDistrict = async (options) => {
  try {
    if (!options) throw new Error("Invalid options");
    return await District.findAll(options);
  } catch (err) {
    throw err;
  }
};

const getAllDistricts = async () => {
  try {
    return await District.findAll({
      include: [
        {
          model: State,
          attributes: ["state"],
        },
      ],
      attributes: ["district"],
    });
  } catch (err) {
    throw err;
  }
};

const findDistrictByID = async (districtID) => {
  try {
    if (!districtID) throw new Error("Invalid districtID");

    return await District.findOne({ where: { districtID } });
  } catch (err) {
    throw err;
  }
};

const findDistrictByName = async (district, stateID) => {
  try {
    if (!district || !stateID) throw new Error("Invalid options");
    return await District.findOne({
      where: { district, stateID },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findDistrict,
  findDistrictByID,
  findDistrictByName,
  getAllDistricts,
};
