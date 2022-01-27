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
    tableName: "district",
    timestamps: false,
  });

  District.associate = ({ Patient, Staff }) => {
    District.hasMany(Patient, {
      foreignKey: "districtID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Patient.belongsTo(District);

    District.hasMany(Staff, {
      foreignKey: "districtID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Staff.belongsTo(District);
  };

  return District;
};
