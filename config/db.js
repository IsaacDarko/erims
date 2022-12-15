const Sequelize = require('sequelize');
const config = require('config');

module.exports = new Sequelize( 'goldenlo2_erims', 'goldenlo2_manager', 'W+tdRs13+]{[',  config.get('sqlConnect'));