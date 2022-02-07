const Patient = require("../models/index")["Patient"];

const createPatient = async (patient, options = {}) => {
  try {
    if (!patient) return;
    return await Patient.create(patient, options);
  } catch (err) {
    throw err;
  }
};

const findPatientByID = async (patientID, options = {}) => {
  try {
    if (!patientID) throw new Error("Invalid patientID");
    return await Patient.findOne({ where: { patientID } }, options);
  } catch (err) {
    throw err;
  }
};

const deletePatientByID = async (patientID, options) => {
  try {
    if (!patientID) return -1;
    return await Patient.destroy({ where: { patientID }, ...options });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createPatient,
  deletePatientByID,
  findPatientByID,
};
