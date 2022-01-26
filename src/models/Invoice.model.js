module.exports = (sequelize, DataTypes) => {
  const invoiceSchema = {
    invoiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    appointmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    appointmentCharge: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    prescriptionCharge: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    roomCharge: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    billedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payedDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  };

  return sequelize.define("Invoice", invoiceSchema, {
    tableName: "invoice",
    timestamps: false,
  });
};
