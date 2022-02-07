const { createUser } = require("../services/User.service");
const { findGenderByName } = require("../services/Gender.service");
const { findStateByName } = require("../services/State.service");
const { findDistrictByName } = require("../services/District.service");
const sequelize = require("../models")["sequelize"];

module.exports = async (req, res, next) => {
  let transaction = await sequelize.transaction();
  // This should be false always to make sure that the user is not admin by default
  const isAdmin = false;
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
    const {
      dataValues: { genderID, gender: genderName },
    } = await findGenderByName(gender);
    const { stateID, state: stateName } = await findStateByName(state);
    const { districtID, district: districtName } = await findDistrictByName(
      district,
      stateID
    );

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

    if (isAdmin) throw new Error("User cannot be an Admin by default");

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
      isAdmin,
    };

    const {
      dataValues: {
        password: passomit,
        genderID: genderomit,
        stateID: stateomit,
        districtID: districtomit,
        ...newUser
      },
    } = await createUser(user, { transaction });

    req.newUser = { ...newUser, genderName, stateName, districtName };
    req.transaction = transaction;

    return next();
  } catch (err) {
    console.log("error here", err);
    await transaction.rollback();
    return res.sendStatus(500);
  }
};
