const { findPatientByID } = require("../services/Patient.service");
const { findStaffRole } = require("../services/Staff.service");
const { findIsAdmin } = require("../services/User.service");

module.exports = async (userID, isAdmin) => {
  const roles = [];

  if (userID) roles.push("User");
  else return roles;

  if (isAdmin) roles.push("Admin");
  else {
    const isAdmin = await findIsAdmin(userID);
    isAdmin && roles.push("Admin");
  }

  const patient = await findPatientByID(userID);
  patient && roles.push("Patient");

  const { role } = await findStaffRole(userID);
  if (role) {
    const { role: staffRole } = role.dataValues;
    staffRole && roles.push(staffRole);
  }

  return roles;
};
