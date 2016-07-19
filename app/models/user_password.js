'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_password = sequelize.define('users_password', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },     
    user_id: DataTypes.INTEGER,
    user_password:{
        allowNull: false,
        type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        user_password.belongsTo(models.users);        
      }
    }
  });
  return user_password;
};