export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('employee', 'cmo', 'ceo'),
      defaultValue: 'employee'
    }
  }, {
    tableName: 'users',
    timestamps: true
  });
  return User;
};
