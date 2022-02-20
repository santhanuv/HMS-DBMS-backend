const { getAllGender } = require("../services/Gender.service");

const getAllGenderHandler = async (req, res) => {
  try {
    const genders = await getAllGender();
    const genderList = genders.map(({ dataValues }) => dataValues.gender);
    console.log(genderList);
    res.json(genderList).status(200);
  } catch (err) {
    console.error(err.stack);
    res.sendStatus(500);
  }
};

module.exports = { getAllGenderHandler };
