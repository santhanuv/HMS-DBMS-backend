const Role = require("../models/index")["Role"];

const findRoleByName = async (role) => {
  try {
    if (!role) throw new Error("Invalid role");
    return await Role.findOne({ where: { role } });
  } catch (err) {
    throw err;
  }
};

const findRoleByID = async (roleID) => {
  try {
    if (!roleID) throw new Error("Invalid roleID");
    return await Role.findOne({ where: { roleID } });
  } catch (err) {
    throw err;
  }
};

module.exports = { findRoleByID, findRoleByName };
