const Staff_Invite = require("../models/index")["Staff_Invite"];

const createStaffInvite = async (staffInvite, options) => {
  try {
    if (!staffInvite) throw new Error("No staff Invites found");
    if (staffInvite?.isConfirmed === true)
      throw new Error("Can't set isConfirmed on creation");
    return await Staff_Invite.create(staffInvite, options);
  } catch (err) {
    throw err;
  }
};

const getStaffInvite = async (email) => {
  try {
    if (!email) throw new Error("No email");
    return await Staff_Invite.findOne({ where: { email } });
  } catch (err) {
    throw err;
  }
};

const deleteStaffInvite = async (email) => {
  try {
    if (!email) throw new Error("No invite ID");
    return await Staff_Invite.destroy({ where: { email } });
  } catch (err) {
    throw err;
  }
};

const updateStaffInvite = async (email, update) => {
  try {
    if (!email) throw new Error("No invite ID");
    return await Staff_Invite.update(update, { where: { email } });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createStaffInvite,
  getStaffInvite,
  deleteStaffInvite,
  updateStaffInvite,
};
