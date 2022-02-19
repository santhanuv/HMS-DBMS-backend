const { createAppointment } = require("../services/Appointment.service");
const { findATSByID } = require("../services/ATS.service");
const { findUser } = require("../services/User.service");
const { findStaff } = require("../services/Staff.service");
const Department = require("../models/index")["Department"];

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
    const doctorName = doctor ? `${doctor.firstName} ${doctor.lastName}` : "";
    const doctorDepartment = department?.department;
    const slot = await findATSByID(appointment.timeSlotID);

    if (appointment?.dataValues) {
      return res.status(201).json({
        date: appointment.dataValues.date,
        department: doctorDepartment,
        doctor: doctorName,
        time: slot?.dataValues,
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

const getLatestAppointments = async (req, res) => {};

module.exports = { createAppointmentHandler };
