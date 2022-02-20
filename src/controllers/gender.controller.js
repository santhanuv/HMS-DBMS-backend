const { getAllGender } = require("../services/Gender.service");

const getAllGenderHandler = async (req, res) => {
  try {
    const genders = await getAllGender();
    const genderList = genders.map(({ dataValues }) => dataValues.gender);
    res.json(genderList).status(200);
  } catch (err) {
    // logger.error(err.stack);
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = { getAllGenderHandler };
