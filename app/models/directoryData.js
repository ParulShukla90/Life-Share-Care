'use strict';
module.exports = function(sequelize, DataTypes) {
  var directoryData = sequelize.define('directory', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },       
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    title:{
        allowNull: false,
        type: DataTypes.STRING
    },
    path: {
        allowNull: false,
        type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return directoryData;
};