const Sequelize = require('sequelize');
const db = require('../config/db');

const Payments = db.define('transactions', {

    transaction_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    date:{
        type:Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },

    time:{
        type:Sequelize.STRING,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },

    reference_no:{
        type:Sequelize.STRING,
        allowNull: false
    },

    tel_no:{
        type:Sequelize.STRING,
        allowNull: false
    },

    payee_name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    payment_type:{
        type:Sequelize.STRING,
        allowNull: true
    },
    reason:{
        type:Sequelize.STRING,
        allowNull: true
    },

    amount:{
        type:Sequelize.STRING,
        allowNull: false
    },

    email:{
        type:Sequelize.STRING,
        allowNull: true
    },

    collector:{
        type:Sequelize.STRING,
        allowNull: false
    },

    remark:{
        type:Sequelize.STRING,
        allowNull: false
    }

},
{
    freezeTableName: true,
})

module.exports = Payments;