const User = require("../models/index")["User"];

const createUser = async (user, options) => {
  try {
    if (!user) throw new Error("Invalid user data");
    return await User.create(user, options);
  } catch (err) {
    throw err;
  }
};

const findUser = async (options) => {
  try {
    return await User.findAll(options);
  } catch (err) {
    throw err;
  }
};

const findUserByID = async (userID, options) => {
  try {
    if (!userID) throw new Error("Invalid userID");
    return await User.findOne({ options, where: { userID } });
  } catch (err) {
    throw err;
  }
};

const findUserByEmail = async (email) => {
  if (!email) throw new Error("Invalid userID");
  try {
    return await User.findOne({
      where: { email },
    });
  } catch (err) {
    throw err;
  }
};

const findIsAdmin = async (userID) => {
  try {
    if (!userID) throw new Error("Invalid userID");
    const user = await User.findOne({ where: { userID } });
    if (user.dataValues.isAdmin) return true;
    else return false;
  } catch (err) {
    throw err;
  }
};

const deleteUserByID = async (userID) => {
  try {
    if (!userID) return -1;
    return await User.destroy({ where: { userID } });
  } catch (err) {
    throw err;
  }
};

const deleteUserByEmail = async (email) => {
  try {
    if (!email) return -1;
    return await User.destroy({ where: { email } });
  } catch (err) {
    throw err;
  }
};

const validateUser = async (email, password) => {
  try {
    const user = await User.scope("includePassword").findOne({
      where: { email },
    });

    if (!user) return false;
    const isValid = await user.validatePassword(password);
    if (isValid) {
      const { userID, isAdmin, ...rest } = user.toJSON();
      return { userID, isAdmin };
    } else return false;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  createUser,
  deleteUserByID,
  deleteUserByEmail,
  findUser,
  findUserByID,
  findUserByEmail,
  validateUser,
  findIsAdmin,
};
