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

  const District = sequelize.define("District", districtSchema, {
    timestamps: false,
  });

  District.associate = ({ User }) => {
    District.hasMany(User, {
      foreignKey: "districtID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    User.belongsTo(District, {
      foreignKey: "districtID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  };

  return District;
};
