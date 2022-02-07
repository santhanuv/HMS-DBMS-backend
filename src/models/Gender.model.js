module.exports = (sequelize, DataTypes) => {
  const genderSchema = {
    genderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    timestamps: false,
  });

  Gender.associate = ({ User }) => {
    Gender.hasMany(User, {
      foreignKey: "genderID",
      onDelete: "Restrict",
      onUpdate: "CASCADE",
    });
    User.belongsTo(Gender, {
      foreignKey: "genderID",
      onDelete: "Restrict",
      onUpdate: "CASCADE",
    });
  };

  return Gender;
};
