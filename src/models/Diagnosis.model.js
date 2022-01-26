module.exports = (sequelize, DataTypes) => {
  diagnosisSchema = {
    appointmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    diagnosisSummary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  };

  return sequelize.define("Diagnosis", diagnosisSchema, {
    tableName: "diagnosis",
    timestamps: false,
  });
};
