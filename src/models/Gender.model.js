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

  const Gender = sequelize.define("Gender", genderSchema, {
    tableName: "gender",
    timestamp: false,
  });

  Gender.associate = ({ Patient, Staff }) => {
    Gender.hasMany(Patient, {
      foreignKey: "genderID",
      onDelete: "Restrict",
      onUpdate: "CASCADE",
    });
    Patient.belongsTo(Gender);

    Gender.hasMany(Staff, {
      foreignKey: "genderID",
      onDelete: "Restrict",
      onUpdate: "CASCADE",
    });
    Staff.belongsTo(Gender);
  };

  return Gender;
};
