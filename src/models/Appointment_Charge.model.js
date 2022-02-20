module.exports = (sequelize, DataTypes) => {
  const appointmentChargeSchema = {
    doctorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    charge: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  };

  const appointmentCharge = sequelize.define(
    "Appointment_Charge",
    appointmentChargeSchema,
    {
      timestamps: false,
      tableName: "Appointment_Charges",
    }
  );

  return appointmentCharge;
};
