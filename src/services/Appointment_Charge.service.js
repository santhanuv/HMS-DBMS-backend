const AppointmentCharge = require("../models/index")["Appointment_Charge"];

const getDoctorCharge = async (doctorID) => {
  try {
    if (!doctorID) throw new Error("Invalid doctorID");
    return await AppointmentCharge.findOne({
      where: { doctorID: doctorID },
      attributes: ["charge"],
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { getDoctorCharge };
