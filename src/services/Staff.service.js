const Staff = require("../models")["Staff"];

const createStaff = async (values, options) => {
  try {
    if (!values) throw new Error("No values for staff");
    return await Staff.create(values, options);
  } catch (err) {
    throw err;
  }
};

module.exports = { createStaff };
