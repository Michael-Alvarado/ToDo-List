const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Family extends Model {}

Family.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    family_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // due_date: {
    //   type: DataTypes.DATE,
    // },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Family',
  }
)

module.exports = Family;