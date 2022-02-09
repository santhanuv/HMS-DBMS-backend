module.exports = (sequelize, DataTypes) => {
  const roleSchema = {
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  };

  const Role = sequelize.define("Role", roleSchema, {
    timestamps: false,
  });

  Role.associate = ({ Staff, Staff_Invite }) => {
    Role.hasMany(Staff, {
      foreignKey: "roleID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Staff.belongsTo(Role, {
      foreignKey: "roleID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    Role.hasMany(Staff_Invite, {
      foreignKey: "roleID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Staff_Invite.belongsTo(Role, {
      foreignKey: "roleID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Role;
};
