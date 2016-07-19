'use strict';
module.exports = function(sequelize, DataTypes) {
  var aide = sequelize.define('aide', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },       
    user_id: DataTypes.INTEGER,
    email:{
        allowNull: false,
        type: DataTypes.STRING
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return aide;
};