import {
  Sequelize,
  DataTypes,
  IntegerDataType
} from 'sequelize';

export default (sequelize: Sequelize, DataTypes) => {
  var Products = sequelize.define('products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand:{
      type: DataTypes.STRING,
      allowNull: false
    },
    price :{
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
  }
  )
  return Products
};
