module.exports = (sequelize, DataTypes) => {
  const roomSchema = {
    roomID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    typeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inpatientID: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      unique: true,
    },
  };

  return sequelize.define("Room", roomSchema, {
    tableName: "room",
    timestamps: false,
  });
};
