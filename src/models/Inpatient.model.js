module.exports = (sequelize, DataTypes) => {
  const inpatientSchema = {
    patientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    roomID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    admittedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dischargedDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
  };

  return sequelize.define("Inpatient", inpatientSchema, {
    tableName: "inpatient",
    timestamps: false,
  });
};
