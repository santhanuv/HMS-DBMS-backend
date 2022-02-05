const {
  createPatient,
  deletePatientByID,
} = require("../services/Patient.service");
const logger = require("../utils/logger");

const createPatientHandler = async (req, res) => {
  const { newUser, transaction } = req;
  const { emergencyNumber } = req.body;
  const newUserID = newUser.userID;
  try {
    if (!newUser || !transaction || !newUserID) {
      transaction && (await transaction.rollback());
      return res.sendStatus(500);
    }

    if (emergencyNumber) {
      const { dataValues } = await createPatient(
        { patientID: newUserID, emergencyNumber },
        { transaction }
      );

      if (!dataValues) {
        await transaction.rollback();
        return res.sendStatus(500);
      }

      await transaction.commit();
      return res.json({ ...newUser, ...dataValues }).status(200);
    } else {
      await transaction.rollback();
      res.sendStatus(400);
    }
  } catch (err) {
    console.log("Error", err);
    await transaction.rollback();
    return res.sendStatus(500);
  }
};

const deletePatientHandler = async (req, res) => {
  try {
    const result = await deletePatientByID(1);
  } catch (err) {
    logger.error(err);
  }
};

const findPatientHandler = async (req, res) => {
  try {
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  createPatientHandler,
  deletePatientHandler,
  findPatientHandler,
};
