const {
  createAppointment,
  getAllAppointments,
  deleteAppointment,
  getAppointmentByID,
} = require("../services/Appointment.service");
const { findATSByID } = require("../services/ATS.service");
const { findUser, findUserByID } = require("../services/User.service");
const { findStaff, findStaffByID } = require("../services/Staff.service");
const { getDoctorCharge } = require("../services/Appointment_Charge.service");
const Department = require("../models/index")["Department"];
const sequelize = require("../models/index")["sequelize"];
const { QueryTypes } = require("sequelize");

const createAppointmentHandler = async (req, res) => {
  try {
    if (!req?.user || !req.user?.roles) return res.sendStatus(401);
    if (req.user.roles.indexOf("Patient") === -1) return res.sendStatus(403);

    const appointmentBody = {
      doctorID: req.body.doctorID,
      date: req.body.date,
      timeSlotID: req.body.timeSlotID,
      patientID: req.user.userID,
    };

    const appointment = await createAppointment(appointmentBody);

    if (!appointment?.dataValues)
      throw new Error("Unable to create Appointment");

    const doctor = (
      await findUser({
        attributes: ["firstName", "lastName"],
        where: { userID: appointment.dataValues.doctorID },
      })
    )[0];

    const staffID = appointment?.dataValues.doctorID;
    console.log(staffID);

    const staff = (
      await findStaff({
        include: {
          model: Department,
          attributes: ["department"],
        },
        attributes: ["staffID"],
        where: { staffID },
      })
    )[0];

    const department = staff?.dataValues?.Department;
    const doctorDepartment = department?.department;
    const slot = await findATSByID(appointment.timeSlotID);

    const charge = await getDoctorCharge(appointment.dataValues.doctorID);
    const chargeValue = charge?.dataValues?.charge;
    if (!chargeValue) throw new Error("Unable to get Charge");

    if (appointment?.dataValues) {
      return res.status(201).json({
        appointmentID: appointment.dataValues.appointmentID,
        date: appointment.dataValues.date,
        department: doctorDepartment,
        doctor: {
          id: appointment.dataValues.doctorID,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
        },
        timeSlot: slot?.dataValues,
        charge: chargeValue,
        isCompleted: appointment.dataValues.isCompleted,
      });
    } else throw new Error("Unable to create Appointment");
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

const getAppointmentWithDate = async (req, res) => {
  const date = req.date;
};

const getLatestAppointments = (requiredRole) => async (req, res) => {
  try {
    if (!req.user?.userID || !req.user?.roles) return res.sendStatus(401);

    const userID = req.user.userID;
    const userRoles = req.user.roles;

    const docQuery =
      "select a.*, ats.startTime, ats.endTime from Appointments as a join ATS as ats on a.timeSlotID = ats.slotID where a.date > NOW() and a.doctorID = :id order by ABS(DATEDIFF(a.date, NOW())) ASC LIMIT 3;";

    const patientQuery =
      "select a.*, ats.startTime, ats.endTime from Appointments as a join ATS as ats on a.timeSlotID = ats.slotID where a.date > NOW() and a.patientID = :id order by ABS(DATEDIFF(a.date, NOW())) ASC LIMIT 3;";

    const query =
      userRoles.indexOf("Patient") !== -1 && requiredRole === "Patient"
        ? patientQuery
        : userRoles.indexOf("Doctor") !== -1 && requiredRole === "Doctor"
        ? docQuery
        : null;

    if (!query) return res.sendStatus(403);

    const appointments = await sequelize.query(query, {
      replacements: { id: userID },
      type: QueryTypes.SELECT,
    });

    if (!appointments) throw new Error("No appointments");

    const appValues = await Promise.all(
      appointments.map(async (app) => {
        const { doctorID, patientID, timeSlotID, startTime, endTime, ...rest } =
          app;
        if (!doctorID || !patientID) {
          console.log(doctorID, patientID);
          return {};
        }
        const doctor = (
          await findUser({
            where: { userID: doctorID },
            attributes: ["userID", "firstName", "lastName"],
          })
        )[0]?.dataValues;
        const patient = (
          await findUser({
            where: { userID: patientID },
            attributes: ["userID", "firstName", "lastName"],
          })
        )[0]?.dataValues;
        const appFormat = {
          ...rest,
          patient,
          doctor,
          time: { slotID: timeSlotID, startTime, endTime },
        };
        return appFormat;
      })
    );

    return res.status(200).json(appValues);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getAllAppointmentsHandler = (requiredRole) => async (req, res) => {
  try {
    const userID = req?.user?.userID;
    const userRoles = req?.user?.roles;

    if (!userID || !userRoles) return res.sendStatus(401);

    const query =
      userRoles.indexOf("Patient") !== -1 && requiredRole === "Patient"
        ? { patientID: userID }
        : userRoles.indexOf("Doctor") !== -1 && requiredRole === "Doctor"
        ? { doctorID: userID }
        : null;

    if (!query) return res.sendStatus(403);

    const appointments = await getAllAppointments({
      where: query,
    });

    const appValues = await Promise.all(
      appointments.map(async (app) => {
        const docID = app.dataValues?.doctorID;
        const docName = (
          await findUser({
            where: { userID: docID },
            attributes: ["userID", "firstName", "lastName"],
          })
        )[0]?.dataValues;
        const patientName = (
          await findUser({
            where: { userID: app.patientID },
            attributes: ["userID", "firstName", "lastName"],
          })
        )[0]?.dataValues;
        const tsID = app.dataValues.timeSlotID;
        const tsVal = (await findATSByID(tsID))?.dataValues;
        const charge = (await getDoctorCharge(docID))?.dataValues?.charge;

        if (!docName || !tsVal || !charge) throw Error("Invalid appointment");

        const value = {
          charge,
          appointmentID: app.dataValues.appointmentID,
          doctor: docName,
          patient: patientName,
          date: app.dataValues.date,
          timeSlot: tsVal,
          isCompleted: app.dataValues.isCompleted,
        };

        return value;
      })
    );

    res.status(200).json(appValues);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const deleteAppointmentHandler = async (req, res) => {
  try {
    const appointmentID = req.params.id;
    if (!req.user?.userID) return res.sendStatus(401);
    const patientID = req.user.userID;

    const appointment = await getAppointmentByID(appointmentID, {
      attributes: ["patientID"],
    });
    if (appointment?.dataValues?.patientID !== patientID)
      return res.sendStatus(401);

    const delRes = await deleteAppointment(appointmentID);
    if (delRes) {
      res.sendStatus(200);
    } else throw new Error("Unable to delete Appointment");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  createAppointmentHandler,
  getAllAppointmentsHandler,
  deleteAppointmentHandler,
  getLatestAppointments,
};
