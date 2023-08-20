import {
  Sequelize,
  DataTypes,
  IntegerDataType
} from 'sequelize';

export default (sequelize: Sequelize, DataTypes) => {
  var Categories = sequelize.define('categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
  })

  return Categories
};
