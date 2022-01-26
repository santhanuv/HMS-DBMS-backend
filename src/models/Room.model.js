module.exports = (sequelize, DataTypes) => {
  const roomSchema = {
    roomID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    typeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  return sequelize.define("Room", roomSchema, {
    tableName: "room",
    timestamps: false,
  });
};
