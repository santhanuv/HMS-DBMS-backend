const Patient = require("../models/index")["Patient"];

const createPatient = async (patient) => {
  try {
    if (!patient) return;
    return await Patient.create(patient);
  } catch (err) {
    throw err;
  }
};

const findPatient = async (options) => {
  try {
    const patients = await Patient.findAll(options);
    return JSON.stringify(patients);
  } catch (err) {
    throw err;
  }
};

const findPatientByID = async (patientID) => {
  try {
    const patientRow = await Patient.findOne({ where: { patientID } });
    return patientRow.toJSON();
  } catch (err) {
    throw err;
  }
};

const findPatientByEmail = async (email) => {
  try {
    const patientRow = await Patient.findOne({ where: { email } });
    return patientRow.toJSON();
  } catch (err) {
    throw err;
  }
};

const deletePatientByID = async (patientID) => {
  try {
    if (!patientID) return -1;
    return await Patient.destroy({ where: { patientID } });
  } catch (err) {
    throw err;
  }
};

const deletePatientByEmail = async (email) => {
  try {
    if (!email) return -1;
    return await Patient.destroy({ where: { email } });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createPatient,
  deletePatientByID,
  deletePatientByEmail,
  findPatient,
  findPatientByID,
  findPatientByEmail,
};
