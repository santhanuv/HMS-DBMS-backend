module.exports = (sequelize, DataTypes) => {
  const genderSchema = {
    genderID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },
    gender: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
  };

  return sequelize.define("Gender", genderSchema, {
    tableName: "gender",
    timestamp: false,
  });
};
