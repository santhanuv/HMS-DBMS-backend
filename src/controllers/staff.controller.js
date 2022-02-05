const { createStaff } = require("../services/Staff.service");
const { findDepartmentByName } = require("../services/Department.service");
const { findRoleByName } = require("../services/Role.service");
const { createStaffRole } = require("../services/Staff_Role.service");

const createStaffHandler = async (req, res) => {
  const {
    newUser: { userID: newUserID, ...newUser },
    transaction,
  } = req;
  const { salary, department, role } = req.body;

  try {
    if (!newUser || !transaction || !newUserID) {
      transaction && (await transaction.rollback());
      return res.sendStatus(500);
    }

    if (role.toLowerCase().trim() === "admin") {
      transaction && (await transaction.rollback());
      return res.sendStatus(403);
    }

    const {
      dataValues: { departmentID, department: departmentName },
    } = await findDepartmentByName(department);

    const {
      dataValues: { departmentID: omit_depart, ...newStaff },
    } = await createStaff(
      { staffID: newUserID, salary, departmentID },
      { transaction }
    );

    const {
      dataValues: { roleID, role: roleName },
    } = await findRoleByName(role);

    await createStaffRole(
      { roleID, staffID: newStaff.staffID },
      { transaction }
    );

    const staffValues = {
      ...newUser,
      ...{ ...newStaff, department: departmentName },
      role,
    };

    await transaction.commit();
    res.json(staffValues).status(200);
  } catch (err) {
    console.log(err);
    transaction && transaction.rollback();
    return res.sendStatus(500);
  }
};

module.exports = { createStaffHandler };
