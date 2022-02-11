const { findAvaliableATS } = require("../services/ATS.service");

const getAvailableATSHandler = async (req, res) => {
  try {
    if (!req.user) return res.sendStatus(401);

    const doctorID = req.query.doctor;
    const date = req.query.date;

    const ATS = await findAvaliableATS(doctorID, date);

    return res.status(200).json(ATS);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = { getAvailableATSHandler };
