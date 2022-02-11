const { getAllDepartments } = require("../services/Department.service");

const getAllDepartmentsHandler = async (req, res) => {
  try {
    if (!req.user) return res.sendStatus(401);

    const dptObjs = await getAllDepartments();
    let departments = [];

    if (dptObjs) {
      departments = dptObjs.map(({ dataValues }) => dataValues.department);
    }

    return res.json(departments).status(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = { getAllDepartmentsHandler };
