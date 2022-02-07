const Staff_Role = require("../models/index")["Staff_Role"];

const createStaffRole = async (values, options) => {
  try {
    if (!values) throw new Error("Invalid value");
    return await Staff_Role.create(values, options);
  } catch (err) {
    throw err;
  }
};

module.exports = { createStaffRole };
