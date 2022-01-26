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

  return sequelize.define("State", stateSchema, {
    tableName: "state",
    timestamps: false,
  });
};
