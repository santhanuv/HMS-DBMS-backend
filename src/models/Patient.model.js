module.exports = (sequelize, DataTypes) => {
  const patientSchema = {
    patientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    emergencyNumber: {
      type: DataTypes.CHAR(10),
      allowNull: false,
    },
  };

  const Patient = sequelize.define("Patient", patientSchema, {
    timestamps: false,
  });

  Patient.associate = ({ Appointment, Inpatient }) => {
    Patient.hasMany(Appointment, {
      foreignKey: "patientID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Appointment.belongsTo(Patient, {
      foreignKey: "patientID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Patient.hasOne(Inpatient, {
      foreignKey: "patientID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Inpatient.belongsTo(Patient);
  };

  return Patient;
};
