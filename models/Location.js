const Sequelize = require('sequelize');
const db = require('../config/db');

const LocationData = db.define('location_data', {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    areacode:{
        type:Sequelize.STRING,
        allowNull: false
    },

    location_name:{
        type:Sequelize.STRING,
        allowNull: false
    },

    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
       default: new Date()
    },

    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date()
    }

},
{
    freezeTableName: true,
})

module.exports = LocationData;