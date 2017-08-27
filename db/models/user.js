'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: "http://www.havoca.org/wp-content/uploads/2016/03/icon-user-default-300x300.png",
  }
})
