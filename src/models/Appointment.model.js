module.exports = (sequelize, DataTypes) => {
  const appointmentSchema = {
    appointmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    patientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  };

  const Appointment = sequelize.define("Appointment", appointmentSchema, {
    tableName: "appointment",
    timestamps: false,
  });

  Appointment.associate = (models) => {};

  return Appointment;
};
