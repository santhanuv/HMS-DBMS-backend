const { getAllDistricts } = require("../services/District.service");

const getAllDistrictHandler = async (req, res) => {
  try {
    const district = await getAllDistricts();
    const formated = {};

    district.forEach(({ dataValues: { State, ...District } }) => {
      const state = State.state;
      const district = District.district;

      if (!formated[state]) {
        formated[state] = [district];
      } else {
        formated[state].push(district);
      }
    });

    res.json(formated).status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = { getAllDistrictHandler };
