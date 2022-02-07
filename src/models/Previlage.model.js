module.exports = (sequelize, DataTypes) => {
  const previlageSchema = {
    previlageID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    write: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    update: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  };

  const Previlage = sequelize.define("Previlage", previlageSchema, {
    tableName: "previlage",
    timestamps: false,
  });

  return Previlage;
};
