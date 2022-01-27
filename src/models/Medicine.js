module.exports = (sequelize, DataTypes) => {
  const medicineSchema = {
    medicineID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(150),
      defaultValue: null,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  };

  const Medicine = sequelize.define("Medicine", medicineSchema, {
    tableName: "medicine",
    timestamps: false,
  });

  Medicine.associate = ({ Medication }) => {
    Medicine.hasMany(Medication, {
      foreignKey: "medicineID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Medication.belongsTo(Medicine);
  };

  return Medicine;
};
