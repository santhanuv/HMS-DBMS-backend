const {
  createPatient,
  deletePatientByID,
  findPatient,
} = require("../services/Patient.service");
const { findGenderID } = require("../services/Gender.service");
const { findStateID } = require("../services/State.service");
const { findDistrictID } = require("../services/District.service");
const logger = require("../utils/logger");

const createPatientHandler = async (req, res) => {
  const { gender, state, district, ...rest } = patient;
  const genderID = await findGenderID(gender);
  const stateID = await findStateID(state);
  const districtID = await findDistrictID(district, stateID);

  const newPatient = {
    ...rest,
    genderID,
    stateID,
    districtID: districtID,
  };
};
const deletePatientHandler = async (req, res) => {
  try {
    const result = await deletePatientByID(1);
  } catch (err) {
    logger.error(err);
  }
};

const findPatientHandler = async (req, res) => {
  try {
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  createPatientHandler,
  deletePatientHandler,
  findPatientHandler,
};
