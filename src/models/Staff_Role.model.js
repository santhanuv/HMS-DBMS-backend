module.exports = (sequelize, DataTypes) => {
  const staffRoleSchema = {
    staffID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  };

  const staffRole = sequelize.define("Staff_Role", staffRoleSchema, {
    timestamps: false,
  });

  return staffRole;
};
