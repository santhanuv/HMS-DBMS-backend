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

  State.associate = ({ District, User }) => {
    const districtOptions = {
      foreignKey: "stateID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    };
    State.hasMany(District, {
      foreignKey: "stateID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    District.belongsTo(State, {
      foreignKey: "stateID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    State.hasMany(User, {
      foreignKey: "stateID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    User.belongsTo(State, {
      foreignKey: "stateID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  };

  return State;
};
