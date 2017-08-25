'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('planet', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    validate: {
      isURL: true
    }
  }

})
