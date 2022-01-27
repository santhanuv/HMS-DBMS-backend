module.exports = (sequelize, DataTypes) => {
  const appMedSchema = {
    appMedID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    medicationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const AppointmentMedication = sequelize.define(
    "AppointmentMedication",
    appMedSchema,
    {
      tableName: "appointmentMedication",
      timestamps: false,
    }
  );

  return AppointmentMedication;
};
