const Sequelize = require('sequelize');
const db = require('../config/db');

const Agent = db.define('agent', {

    agent_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },

    full_name:{
        type:Sequelize.STRING,
        allowNull: false
    },

    age:{
        type:Sequelize.NUMBER,
        allowNull: false
    },

    tel_no:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    ids:{
        type:Sequelize.STRING,
        allowNull: true
    },

    role:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue: 'agent'
    },

    gender:{
        type:Sequelize.STRING,
        allowNull: false
    },

    assigned_areas:{
        type:Sequelize.STRING,
        allowNull: true
    },

    assigned_device:{
        type:Sequelize.STRING,
        allowNull: true
    },

    average_collection_ytd:{
        type:Sequelize.STRING,
        allowNull: true
    },

    agent_or_superagent:{
        type:Sequelize.STRING,
        allowNull: true
    },

    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }

},
{
    freezeTableName: true,
})

module.exports = Agent;