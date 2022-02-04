const Patient = require("../models/index")["Patient"];

const createPatient = async (patient, options = {}) => {
  try {
    if (!patient) return;
    return await Patient.create(patient, options);
  } catch (err) {
    throw err;
  }
};

const findPatient = async (values, options) => {
  try {
    if (!values) return null;
    const patients = await Patient.findAll(values, options);
    return JSON.stringify(patients);
  } catch (err) {
    throw err;
  }
};

const findPatientByID = async (patientID, options = {}) => {
  try {
    if (!patientID) return null;
    const patientRow = await Patient.findOne({ where: { patientID } }, options);
    return patientRow.toJSON();
  } catch (err) {
    throw err;
  }
};

const findPatientByEmail = async (email, options) => {
  try {
    if (!email) return null;
    const patientRow = await Patient.findOne({ where: { email } }, options);
    return patientRow.toJSON();
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

const deletePatientByEmail = async (email, options) => {
  try {
    if (!email) return -1;
    return await Patient.destroy({ where: { email }, ...options });
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
