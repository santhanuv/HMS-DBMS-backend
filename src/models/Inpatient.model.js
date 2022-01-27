module.exports = (sequelize, DataTypes) => {
  const inpatientSchema = {
    patientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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

  const Inpatient = sequelize.define("Inpatient", inpatientSchema, {
    tableName: "inpatient",
    timestamps: false,
  });

  Inpatient.associate = ({ Room }) => {
    Inpatient.hasOne(Room, {
      foreignKey: "inpatientID",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    Room.belongsTo(Inpatient);
  };

  return Inpatient;
};
