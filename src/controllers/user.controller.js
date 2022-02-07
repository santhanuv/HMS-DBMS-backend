const { createUser, findUserByID } = require("../services/User.service");
const { findGenderID } = require("../services/Gender.service");
const { findStateID } = require("../services/State.service");
const { findDistrictID } = require("../services/District.service");

const getUserByIdHandler = async (req, res) => {
  const id = parseInt(req.params.id);

  if (!req.userID) return res.sendStatus(401);
  if (req.userID !== id) return res.sendStatus(403);

  try {
    const user = await findUserByID(id);
    if (!user) return res.sendStatus(404);

    return res.status(200).json(user.dataValues);
  } catch (err) {
    console.log(err.message, err.stack);
    return res.sendStatus(500);
  }
};

const createUserHandler = async (req, res) => {
  // Should always be false to make sure that a new user can't be an admin.
  const isAdmin = false;
  try {
    const { gender, state, district, ...rest } = req.body;
    const genderID = await findGenderID(gender);
    const stateID = await findStateID(state);
    const districtID = await findDistrictID(district, stateID);

    // Check if null
    if (!genderID || !stateID || !districtID)
      return res
        .json({
          err: {
            msg: `Invalid ${!genderID && "gender"}${!stateID && ", state"}${
              !districtID && ", district"
            }`,
          },
        })
        .status(400);

    const userObject = await createUser({
      ...rest,
      isAdmin,
      genderID,
      stateID,
      districtID,
    });
    const { password, ...newUser } = userObject.dataValues;

    return res.status(201).json({ ...newUser });
  } catch (err) {
    return res.json({ err: { msg: err.msg } }).status(500);
  }
};

module.exports = { createUserHandler, getUserByIdHandler };
