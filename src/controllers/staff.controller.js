const { createStaff } = require("../services/Staff.service");
const { findDepartmentByName } = require("../services/Department.service");

const createStaffHandler = async (req, res) => {
  const {
    newUser: { userID: newUserID, ...newUser },
    transaction,
  } = req;
  const { salary, department } = req.body;

  try {
    if (!newUser || !transaction || !newUserID) {
      transaction && (await transaction.rollback());
      return res.sendStatus(500);
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

    const staffValues = {
      ...newUser,
      ...{ ...newStaff, department: departmentName },
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
