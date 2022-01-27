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

  Appointment.associate = ({ Diagnosis, Invoice, AppointmentMedication }) => {
    Appointment.hasOne(Diagnosis, {
      foreignKey: "appointmentID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Diagnosis.belongsTo(Appointment);

    Appointment.hasOne(Invoice, {
      foreignKey: "appointmentID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Invoice.belongsTo(Appointment);

    Appointment.hasMany(AppointmentMedication, {
      foreignKey: "appointmentID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    AppointmentMedication.belongsTo(Appointment);
  };

  return Appointment;
};
