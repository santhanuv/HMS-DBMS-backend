module.exports = (sequelize, DataTypes) => {
  const validSessionSchema = {
    sessionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  };

  const ValidSession = sequelize.define("Valid_Session", validSessionSchema, {
    tableName: "Valid_Sessions",
  });

  return ValidSession;
};
