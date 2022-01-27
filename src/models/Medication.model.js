module.exports = (sequelize, DataTypes) => {
  medicationSchema = {
    medicationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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

  const Medication = sequelize.define("Medication", medicationSchema, {
    tableName: "medication",
    timestamps: false,
  });

  Medication.associate = ({ AppointmentMedication }) => {
    Medication.hasMany(AppointmentMedication, {
      foreignKey: "medicationID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    AppointmentMedication.belongsTo(Medication);
  };

  return Medication;
};
