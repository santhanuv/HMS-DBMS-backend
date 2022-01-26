module.exports = (sequelize, DataTypes) => {
  const districtSchema = {
    districtID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stateID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  return sequelize.define("District", districtSchema, {
    tableName: "district",
    timestamps: false,
  });
};
