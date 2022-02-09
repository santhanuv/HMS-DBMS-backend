module.exports = (sequelize, DataTypes) => {
  const staffInviteSchema = {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  };

  const StaffInvite = sequelize.define("Staff_Invite", staffInviteSchema, {
    timestamps: false,
    tableName: "Staff_Invites",
  });

  return StaffInvite;
};
