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
  };

  const Staff = sequelize.define("Staff", staffSchema, {
    timestamps: false,
  });

  Staff.associate = ({ Staff_Role }) => {
    Staff.hasMany(Staff_Role, {
      foreignKey: "staffID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Staff_Role.belongsTo(Staff, {
      foreignKey: "staffID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Staff;
};
