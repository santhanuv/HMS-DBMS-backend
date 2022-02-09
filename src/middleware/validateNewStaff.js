const { verify } = require("../utils/jwtUtils");
const {
  getStaffInvite,
  deleteStaffInvite,
} = require("../services/Staff_Invite.service");
const { findDepartmentByID } = require("../services/Department.service");
const { findRoleByID } = require("../services/Role.service");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies["staff-reg-token"];

    if (!token) return res.sendStatus(401);

    const { valid, decrypt } = verify(token);
    if (!valid) return res.sendStatus(401);

    if (decrypt) {
      const { email: inviteEmail } = decrypt;

      if (!inviteEmail) return res.sendStatus(401);
      const inviteObj = await getStaffInvite(inviteEmail);
      if (!inviteObj) return res.sendStatus(401);

      const { email, roleID, departmentID, salary, isConfirmed } =
        inviteObj.dataValues;

      const deleteRes = await deleteStaffInvite(email);
      if (!deleteRes) throw new Error("Unable to delete Staff Invite");

      if (!isConfirmed) {
        return res.sendStatus(403);
      }

      const roleObj = await findRoleByID(roleID);
      const dptObj = await findDepartmentByID(departmentID);

      req.body.email = email;
      req.body.role = roleObj?.dataValues?.role;
      req.body.department = dptObj?.dataValues?.department;
      req.body.salary = salary;

      next();
    } else {
      throw new Error("Token doesn't have anything to decrypt");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
