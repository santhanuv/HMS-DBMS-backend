const { getAllRoles } = require("../services/Roles.service");
const logger = require("../utils/logger");

const getAllRolesHandler = async (req, res) => {
  try {
    if (!req?.user) return res.sendStatus(401);
    if (req?.user?.roles.indexOf("Admin") === -1) return res.sendStatus(403);

    const roles = await getAllRoles();
    const roleValues = roles.map(({ dataValues }) => dataValues.role);
    res.status(200).json(roleValues);
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
};

module.exports = { getAllRolesHandler };
