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

  Staff.associate = ({ Appointment }) => {
    Staff.hasMany(Appointment, {
      foreignKey: "doctorID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Appointment.belongsTo(Staff, {
      foreignKey: "doctorID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  };

  return Staff;
};
