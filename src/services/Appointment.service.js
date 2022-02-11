const Appointment = require("../models/index")["Appointment"];

const createAppointment = async (appointment, options) => {
  try {
    if (!appointment) throw new Error("No appointment");
    return await Appointment.create(appointment, options);
  } catch (err) {
    throw err;
  }
};

module.exports = { createAppointment };
