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

  return sequelize.define("Doctor", doctorSchema, {
    tableName: "doctor",
    timestamps: false,
  });
};
