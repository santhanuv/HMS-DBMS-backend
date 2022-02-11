const ATS = require("../models/index")["ATS"];
const Appointment = require("../models/index")["Appointment"];

const findATS = async (options) => {
  try {
    if (!options) throw new Error("Invalid options");
    return await ATS.findAll(options);
  } catch (err) {
    throw err;
  }
};

const findATSByID = async (slotID) => {
  try {
    if (!slotID) throw new Error("Invalid slotID");
    return await ATS.findOne({ where: { slotID } });
  } catch (err) {
    throw err;
  }
};

const findAvaliableATS = async (doctorID, date) => {
  try {
    if (!doctorID && !date) throw new Error("Invalid arguments");
    const allATS = await findATS({});
    const takenATS = await ATS.findAll({
      include: {
        model: Appointment,
        where: { doctorID, date },
        attributes: ["timeSlotID"],
      },
    });

    if (takenATS.length === 0) return allATS;
    if (allATS.length === 0) return [];

    const allATSValues = allATS.map(({ dataValues }) => dataValues);
    const takenSlotIDs = takenATS.map(
      ({ dataValues }) => dataValues.timeSlotID
    );
    const avilATS = allATSValues.filter(
      ({ slotID }) => takenSlotIDs.indexOf(slotID) === -1
    );
    return avilATS;
  } catch (err) {
    throw err;
  }
};

module.exports = { findATS, findAvaliableATS, findATSByID };
