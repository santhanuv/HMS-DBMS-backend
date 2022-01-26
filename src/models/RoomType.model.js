module.exports = (sequelize, DataTypes) => {
  const roomTypeSchema = {
    typeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: true,
    },
    facilities: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  };

  return sequelize.define("RoomType", roomTypeSchema, {
    tableName: "roomType",
    timestamps: false,
  });
};
