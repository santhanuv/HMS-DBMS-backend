const Role = require("../models/index")["Role"];

const getAllRoles = async () => {
  try {
    console.log("this");
    return await Role.findAll({ attributes: ["role"] });
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllRoles };
