module.exports = (sequelize, DataTypes) => {
  const doctorSchema = {
    doctorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    appointmentCharge: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  };

  const Doctor = sequelize.define("Doctor", doctorSchema, {
    tableName: "doctor",
    timestamps: false,
  });

  Doctor.associate = ({ Appointment }) => {
    Doctor.hasMany(Appointment, {
      foreignKey: "doctorID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Appointment.belongsTo(Doctor);
  };

  return Doctor;
};
