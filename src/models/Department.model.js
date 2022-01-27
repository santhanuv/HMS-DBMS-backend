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

  const Department = sequelize.define("Department", departmentSchema, {
    tableName: "department",
    timestamps: false,
  });

  Department.associate = ({ Staff }) => {
    Department.hasMany(Staff, {
      foreignKey: "departmentID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Staff.belongsTo(Department);
  };

  return Department;
};
