module.exports = (sequelize, DataTypes) => {
  const ATSSchema = {
    slotID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  };

  const ATS = sequelize.define("ATS", ATSSchema, {
    timestamps: false,
    tableName: "ATS",
  });

  ATS.associate = ({ Appointment }) => {
    ATS.hasMany(Appointment, {
      foreignKey: "timeSlotID",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Appointment.belongsTo(ATS, {
      foreignKey: "timeSlotID",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return ATS;
};
