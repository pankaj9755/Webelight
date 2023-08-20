import {
    Sequelize,
    DataTypes,
    IntegerDataType
} from 'sequelize';

export default (sequelize: Sequelize, DataTypes) => {
    var User = sequelize.define('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          firstName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          userName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          email: {
            type: DataTypes.STRING
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          mobilNumber: {
            type: DataTypes.BIGINT,
            allowNull: false
          },
          role: {
            type: DataTypes.ENUM(),
            values: ["admin", "user"],
    
          },
          status: {
            type: DataTypes.ENUM(),
            values: ["active", "inactive"],
          },
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: false,
    })

    return User
};
