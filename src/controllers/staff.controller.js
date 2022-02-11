const ms = require("ms");
const { verify } = require("../utils/jwtUtils");
const { createStaff, getStaffsByRole } = require("../services/Staff.service");
const { findDepartmentByName } = require("../services/Department.service");
const { findRoleByName } = require("../services/Role.service");
const { createInviteToken } = require("../utils/tokens");
const { getAllDepartments } = require("../services/Department.service");
const {
  createStaffInvite,
  getStaffInvite,
  updateStaffInvite,
} = require("../services/Staff_Invite.service");
const sendMail = require("../utils/sendMails");

process.env.NODE_ENV !== "production" && require("dotenv").config();
const inviteTokenTTL = process.env.INVITE_TOKEN_TTL;
const accessTokenTTl = process.env.ACCESS_TOKEN_TTL;

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

    const {
      dataValues: { departmentID, department: departmentName },
    } = await findDepartmentByName(department);

    const {
      dataValues: { roleID, role: roleName },
    } = await findRoleByName(role);

    const {
      dataValues: { departmentID: omit_depart, ...newStaff },
    } = await createStaff(
      { staffID: newUserID, salary, departmentID, roleID },
      { transaction }
    );

    const staffValues = {
      ...newUser,
      ...{ ...newStaff, department: departmentName },
      roleName,
    };

    await transaction.commit();
    res.json(staffValues).status(201);
  } catch (err) {
    console.log(err);
    transaction && transaction.rollback();
    return res.sendStatus(500);
  }
};

const InviteStaffHandler = async (req, res) => {
  try {
    console.log("Inviting Staff");

    if (req?.user?.roles?.indexOf("Admin") === -1) return res.sendStatus(401);
    const { email, role, department, salary } = req.body;

    const roleObject = await findRoleByName(role);
    const departmentObj = await findDepartmentByName(department);

    if (!roleObject?.dataValues || !departmentObj?.dataValues)
      return res.sendStatus(400);

    const { roleID, role: roleName } = roleObject.dataValues;
    const { departmentID, department: departmentName } =
      departmentObj.dataValues;

    const token = createInviteToken(email);
    if (!token) throw new Error("Unable to create Invite token");

    const staffInvite = { email, roleID, token, departmentID, salary };

    const { dataValues } = await createStaffInvite(staffInvite);

    if (!dataValues) return res.sendStatus(500);

    const confirmUrl = `http://localhost:3000/confirmation/staff/${token}`;

    const mail = {
      from: "Hospital Name <hospitalName@email.com>",
      to: `${email}`,
      subject: "Join our hospital as a staff.",
      text: `Click the link to confirm and create your staff account for Hospital Name\nLink: <a href="${confirmUrl}">${confirmUrl}</a>\n`,
      html: `<h1>Click the link to confirm and create your staff account for Hospital Name</h1><br><a href="${confirmUrl}">${confirmUrl}</a>`,
    };

    sendMail(mail);

    res.json({ msg: "Confirmation mail send to the user" }).status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const confirmInvitation = async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) return res.sendStatus(401);

    const { valid, decrypt } = verify(token);
    const invitedEmail = decrypt?.email;

    if (!valid || !invitedEmail) return res.sendStatus(401);
    const updatedRows = await updateStaffInvite(invitedEmail, {
      isConfirmed: true,
    });
    if (!updatedRows) return res.sendStatus(401);

    res.cookie("staff-reg-token", token, {
      httpOnly: true,
      maxAge: ms(`${inviteTokenTTL}`),
      sameSite: "none",
      secure: true,
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getDoctorsHandler = async (req, res) => {
  try {
    if (!req.user) return res.sendStatus(401);

    const role = await findRoleByName("Doctor");
    if (!role?.dataValues?.roleID) throw new Error("No Doctor Role found");
    const roleID = role.dataValues.roleID;

    const doctorDptObj = await getAllDepartments();
    const doctorDpts = doctorDptObj.map(({ dataValues }) => dataValues);

    const doctors = await getStaffsByRole(roleID);
    const dptDocs = {};

    doctors &&
      doctors.forEach(
        ({ dataValues: docValue, dataValues: { User: userValue } }) => {
          const departmentName = doctorDpts.find(
            (dpt) => dpt.departmentID === docValue.departmentID
          )["department"];
          const doctorName = `${userValue.firstName} ${userValue.lastName}`;
          const doctorID = docValue.staffID;
          dptDocs[departmentName] = dptDocs[departmentName]
            ? dptDocs[departmentName].push({ name: doctorName, id: doctorID })
            : [{ name: doctorName, id: doctorID }];
        }
      );

    return res.status(200).json(dptDocs);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = {
  createStaffHandler,
  InviteStaffHandler,
  confirmInvitation,
  getDoctorsHandler,
};
