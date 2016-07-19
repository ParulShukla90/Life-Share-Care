'use strict';
module.exports = function(sequelize, DataTypes) {
  var patients = sequelize.define('patients', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },       
    user_id: DataTypes.INTEGER,
    patient_name:{
        allowNull: false,
        type: DataTypes.STRING
    },
    age: DataTypes.INTEGER,
    address:{
        type: DataTypes.STRING
    },    
    created_by:{
        allowNull: false,
        type: DataTypes.STRING
    },
    is_active:{
        type: DataTypes.BOOLEAN
    }
         
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return patients;
};