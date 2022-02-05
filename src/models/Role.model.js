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

  Role.associate = ({ Staff_Role }) => {
    Role.hasMany(Staff_Role, {
      foreignKey: "roleID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Staff_Role.belongsTo(Role, {
      foreignKey: "roleID",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  };

  return Role;
};
