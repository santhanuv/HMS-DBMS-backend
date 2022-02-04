const bcrypt = require("bcrypt");
process.env.NODE_ENV !== "production" && require("dotenv").config();

const passwordHashHook = async (user) => {
  try {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.SALT_WORK_FACTOR)
    );
  } catch (err) {
    throw err;
  }
};

module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    userID: {
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
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(128),
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
  };

  const User = sequelize.define("User", userSchema, {
    timestamps: false,
    hooks: {
      beforeCreate: passwordHashHook,
      beforeUpdate: passwordHashHook,
    },
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      includePassword: {
        attributes: {},
      },
    },
  });

  // Instance Method for validating password
  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.associate = ({ Patient, Valid_Session }) => {
    User.hasOne(Patient, {
      foreignKey: "patientID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Patient.belongsTo(User, {
      foreignKey: "patientID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasOne(Valid_Session, {
      foreignKey: "userID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Valid_Session.belongsTo(User, {
      foreignKey: "userID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
