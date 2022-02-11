const Staff = require("../models")["Staff"];
const User = require("../models")["User"];

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

const findStaff = async (options) => {
  try {
    if (!options) throw new Error("Invalid options");
    return await Staff.findAll(options);
  } catch (err) {
    throw err;
  }
};

const getStaffsByRole = async (roleID) => {
  try {
    if (!roleID) throw new Error("Invalid role");
    return await Staff.findAll({
      include: {
        model: User,
        attributes: ["firstName", "lastName"],
      },
      where: { roleID },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createStaff,
  findStaffByID,
  findStaffRole,
  findStaff,
  getStaffsByRole,
};
