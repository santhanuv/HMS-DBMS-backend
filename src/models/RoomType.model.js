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

  const RoomType = sequelize.define("RoomType", roomTypeSchema, {
    tableName: "roomType",
    timestamps: false,
  });

  RoomType.associate = ({ Room }) => {
    RoomType.hasMany(Room, {
      foreignKey: "typeID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Room.belongsTo(RoomType);
  };

  return RoomType;
};
