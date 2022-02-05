module.exports = (sequelize, DataTypes) => {
  const departmentSchema = {
    departmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    department: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
  };

  const Department = sequelize.define("Department", departmentSchema, {
    timestamps: false,
  });

  Department.associate = ({ Staff }) => {
    Department.hasMany(Staff, {
      foreignKey: "departmentID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Staff.belongsTo(Department, {
      foreignKey: "departmentID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  };

  return Department;
};
