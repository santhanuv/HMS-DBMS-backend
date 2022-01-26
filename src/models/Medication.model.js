module.exports = (sequelize, DataTypes) => {
  medicationSchema = {
    appointmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    medicationNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    medicineID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    isExpired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  };

  return sequelize.define("Medication", medicationSchema, {
    tableName: "medication",
    timestamps: false,
  });
};
