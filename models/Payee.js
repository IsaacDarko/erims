const Sequelize = require('sequelize');
const db = require('../config/db');

const Payee = db.define('tax_payee_customer', {

    customer_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    full_name:{
        type:Sequelize.STRING,
        allowNull: false
    },

    tel:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    mobile_no:{
        type:Sequelize.STRING,
        allowNull: true
    },

    ids:{
        type:Sequelize.STRING,
        allowNull: false
    },

    email:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    tin_no:{
        type:Sequelize.STRING,
        allowNull: false
    },

    dob:{
        type:Sequelize.DATE,
        allowNull: false
    },

    gender:{
        type:Sequelize.STRING,
        allowNull: false
    },

    marital_status:{
        type:Sequelize.STRING,
        allowNull: false
    },

    education_level:{
        type:Sequelize.STRING,
        allowNull: false
    },

    business_sector:{
        type:Sequelize.STRING,
        allowNull: false
    },

    market_segment:{
        type:Sequelize.STRING,
        allowNull: false
    },

    location:{
        type:Sequelize.INTEGER,
        allowNull: false
    },

    customer_type:{
        type:Sequelize.INTEGER,
        allowNull: false
    },

    payee_type:{
        type:Sequelize.INTEGER,
        allowNull: false
    },

    mkt_group:{
        type:Sequelize.STRING,
        allowNull: true
    },

    agent_id:{
        type:Sequelize.NUMBER,
        allowNull: true
    },

    last_payment_date:{
        type:Sequelize.DATE,
        allowNull: true
    },

    last_payment_amount:{
        type:Sequelize.STRING,
        allowNull: true
    },

    total_payment_ytd:{
        type:Sequelize.STRING,
        allowNull: true
    },

    createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

    updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }

},
{
    freezeTableName: true,
})

module.exports = Payee;