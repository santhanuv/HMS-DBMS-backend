module.exports = (sequelize, DataTypes) => {
  const departmentSchema = {
    departmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  };

  return sequelize.define("Department", departmentSchema, {
    tableName: "department",
    timestamps: false,
  });
};
