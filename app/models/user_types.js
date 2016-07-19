'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_types = sequelize.define('user_types', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },     
    type_name: DataTypes.INTEGER,
    email_id:{
        allowNull: false,
        type: DataTypes.STRING
    },
    is_active: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_types;
};