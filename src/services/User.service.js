const User = require("../models/index")["User"];

const createUser = async (user, options) => {
  try {
    if (!user) return;
    return await User.create(user, options);
  } catch (err) {
    throw err;
  }
};

const findUser = async (options) => {
  try {
    const users = await User.findAll(options);
    return JSON.stringify(users);
  } catch (err) {
    throw err;
  }
};

const findUserByID = async (userID) => {
  try {
    return await User.findOne({ where: { userID } });
  } catch (err) {
    throw err;
  }
};

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({
      where: { email },
    });
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
    const isValid = await user.validatePassword(password);
    if (isValid) {
      const { userID, ...rest } = user.toJSON();
      return userID;
    } else return false;
  } catch (err) {
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
};
