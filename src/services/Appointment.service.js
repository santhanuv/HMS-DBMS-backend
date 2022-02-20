const Appointment = require("../models/index")["Appointment"];

const createAppointment = async (appointment, options) => {
  try {
    if (!appointment) throw new Error("No appointment");
    return await Appointment.create(appointment, options);
  } catch (err) {
    throw err;
  }
};

const getAllAppointments = async (options) => {
  try {
    return await Appointment.findAll(options);
  } catch (err) {
    throw err;
  }
};

const getAppointmentByID = async (appointmentID, options) => {
  try {
    if (!appointmentID) throw new Error("Invalid appointmentID");
    return await Appointment.findOne({ where: { appointmentID }, ...options });
  } catch (err) {
    throw err;
  }
};

const deleteAppointment = async (appointmentID, options) => {
  try {
    if (!appointmentID) throw new Error("Invalid appointmentID");
    return await Appointment.destroy({
      where: { appointmentID },
      ...options,
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  deleteAppointment,
  getAppointmentByID,
};
