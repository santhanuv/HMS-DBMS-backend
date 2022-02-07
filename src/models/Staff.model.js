module.exports = (sequelize, DataTypes) => {
  const staffSchema = {
    staffID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    departmentID: {
      type: DataTypes.INTEGER,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const Staff = sequelize.define("Staff", staffSchema, {
    timestamps: false,
  });

  return Staff;
};
