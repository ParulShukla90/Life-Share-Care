'use strict';
module.exports = function(sequelize, DataTypes) {
  var invite = sequelize.define('invite', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },       
    email:{
        allowNull: false,
        type: DataTypes.STRING
    },    
    token:{
        allowNull: false,
        type: DataTypes.STRING
    }, 
    expired_on:{
        allowNull: false,
        type: DataTypes.DATE
    }           
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return invite;
};