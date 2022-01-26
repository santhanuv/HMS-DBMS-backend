module.exports = (sequelize, DataTypes) => {
  const patientSchema = {
    patientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.CHAR(10),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    genderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emergencyNumber: {
      type: DataTypes.CHAR(10),
      allowNull: false,
    },
    stateID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    districtID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  };

  return sequelize.define("Patient", patientSchema, {
    tableName: "patient",
    timestamps: false,
  });
};
