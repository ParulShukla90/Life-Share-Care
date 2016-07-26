'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },    
    typeId:{
      type: DataTypes.INTEGER,
      field: 'type_id'
    },
    pswdId :{
      type: DataTypes.INTEGER,      
      field: 'pswd_id'

    },
    email_id:{
        allowNull: false,
        type: DataTypes.STRING
    },
    user_name:{
        type: DataTypes.STRING
    },
    phone_number:{
        type: DataTypes.STRING
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN  

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      users.belongsTo(models.user_types, {
          as: "type"
        });

      users.hasOne  (models.users_password , {foreignKey: 'user_id'});
     
      }
    },timestamps: false
  } )

  ;
  return users;
};