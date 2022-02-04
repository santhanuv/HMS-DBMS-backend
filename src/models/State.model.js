module.exports = (sequelize, DataTypes) => {
  const stateSchema = {
    stateID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  };

  const State = sequelize.define("State", stateSchema, {
    timestamps: false,
  });

  State.associate = ({ District, Patient, Staff }) => {
    const districtOptions = {
      foreignKey: "stateID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    };
    State.hasMany(District, districtOptions);
    District.belongsTo(State, districtOptions);

    const patientOptions = {
      foreignKey: "stateID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    };
    State.hasMany(Patient, patientOptions);
    Patient.belongsTo(State, patientOptions);

    const staffOptions = {
      foreignKey: "stateID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    };
    State.hasMany(Staff, staffOptions);
    Staff.belongsTo(State, staffOptions);
  };

  return State;
};
