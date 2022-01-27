module.exports = (sequelize, DataTypes) => {
  const stateSchema = {
    stateID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  };

  const State = sequelize.define("State", stateSchema, {
    tableName: "state",
    timestamps: false,
  });

  State.associate = ({ District, Patient, Staff }) => {
    State.hasMany(District, {
      foreignKey: "stateID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    District.belongsTo(State);

    State.hasMany(Patient, {
      foreignKey: "stateID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Patient.belongsTo(State);

    State.hasMany(Staff, {
      foreignKey: "stateID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Staff.belongsTo(State);
  };

  return State;
};
