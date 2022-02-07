const Staff = require("../models")["Staff"];

const createStaff = async (values, options) => {
  try {
    if (!values) throw new Error("No values for staff");
    return await Staff.create(values, options);
  } catch (err) {
    throw err;
  }
};

const findStaffRole = async (staffID) => {
  try {
    if (!staffID) throw new Error("Invalid staffID");
    const staff = await Staff.findOne({ where: { staffID } });
    if (!staff) return { staff: null, role: null };
    const role = await staff.getRole();
    return { staff, role };
  } catch (err) {
    throw err;
  }
};

const findStaffByID = async (staffID) => {
  try {
    if (!staffID) throw new Error("Invalid staffID");
    return await Staff.findOne({ where: { staffID } });
  } catch (err) {
    throw err;
  }
};

module.exports = { createStaff, findStaffByID, findStaffRole };
