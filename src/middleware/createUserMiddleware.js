const { createUser } = require("../services/User.service");
const { findGenderID } = require("../services/Gender.service");
const { findStateID } = require("../services/State.service");
const { findDistrictID } = require("../services/District.service");
const sequelize = require("../models")["sequelize"];

module.exports = async (req, res, next) => {
  let transaction = await sequelize.transaction();
  try {
    const {
      gender,
      state,
      district,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      address,
    } = req.body;
    const genderID = await findGenderID(gender);
    const stateID = await findStateID(state);
    const districtID = await findDistrictID(district, stateID);

    if (!genderID || !stateID || !districtID) {
      transaction.rollback();
      return res
        .json({
          err: {
            msg: `Invalid ${!genderID && "gender"}${!stateID && ", state"}${
              !districtID && ", district"
            }`,
          },
        })
        .status(400);
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dob,
      genderID,
      stateID,
      districtID,
      address,
    };

    const {
      dataValues: { password: omit, ...newUser },
    } = await createUser(user, { transaction });

    req.newUser = newUser;
    req.transaction = transaction;

    return next();
  } catch (err) {
    console.log("error here", err);
    await transaction.rollback();
    return res.sendStatus(500);
  }
};
