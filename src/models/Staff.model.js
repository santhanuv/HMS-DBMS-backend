module.exports = (sequelize, DataTypes) => {
  const staffSchema = {
    staffID: {
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
    departmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    previlageID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  return sequelize.define("Staff", staffSchema, {
    tableName: "staff",
    timestamps: false,
  });
};
