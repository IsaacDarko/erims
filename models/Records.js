const Sequelize = require('sequelize');
const db = require('../config/db');

const RecordData = db.define('record_data', {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    agent_id:{
        type:Sequelize.STRING,
        allowNull: false
    },

    payee_id:{
        type:Sequelize.STRING,
        allowNull: false
    },

    location_id:{
        type:Sequelize.STRING,
        allowNull: false
    },

    ammount_paid:{
        type:Sequelize.STRING,
        allowNull:false
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

module.exports = RecordData;