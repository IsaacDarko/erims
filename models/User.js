const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('users', {

    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    fullname:{
        type:Sequelize.STRING,
        allowNull: false
    },

    username:{
        type:Sequelize.STRING,
        allowNull: true
    },

    email:{
        type:Sequelize.STRING,
        allowNull: true,
        unique: true,
    },

    tel_no:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    password:{
        type:Sequelize.STRING,
        allowNull: false
    },

    user_rank:{
        type:Sequelize.STRING,
        allowNull: false
    },

    last_seen:{
        type:Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },

    registered_on:{
        type:Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }

},
{
    freezeTableName: true,
})

module.exports = User;