"use strict";

var sequelize  = require('../models/index');
var bcrypt = require('bcrypt-nodejs');

  module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      firstname: {type: DataTypes.STRING, allowNull: false},
      lastname: {type: DataTypes.STRING, allowNull: false},
      password: {type: DataTypes.STRING},
      phone: DataTypes.STRING,
      email: {type: DataTypes.STRING, allowNull: false, unique: true,  validate: {isEmail: true}},
      type: {type: DataTypes.ENUM, values: ['Admin', 'Direct Customer', 'DMC', 'Tour Operator', 'Travel Agent'], defaultValue: 'Direct Customer', allowNull: false},
      status: {type: DataTypes.ENUM, values: ['Active', 'Inactive'], defaultValue: 'Inactive'},
      lastLogin: {type: DataTypes.DATE}
    }
  );

  User.hook('beforeCreate', function(user, options){

  });

  User.hook('beforeCreate', function(user, options){
      var hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
      user.password = hash;
      user.email = user.email.toLowerCase();
      return user;
  });
return User;
};
