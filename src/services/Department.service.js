const Department = require("../models")["Department"];

const getAllDepartments = async () => {
  try {
    return await Department.findAll();
  } catch (err) {
    throw err;
  }
};

const findDepartmentByID = async (departmentID) => {
  try {
    if (!departmentID) throw new Error("Invalid Department ID");
    return await Department.findOne({ where: { departmentID } });
  } catch (err) {
    throw err;
  }
};

const findDepartmentByName = async (department) => {
  try {
    if (!department) throw new Error("Invalid Department");
    return await Department.findOne({ where: { department } });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findDepartmentByID,
  findDepartmentByName,
  getAllDepartments,
};
