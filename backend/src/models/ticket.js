const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM(
            'aberto',
            'em_andamento',
            'resolvido',
            'fechado'
        ),
        allowNull: false,
        defaultValue: 'aberto'
    },

    priority: {
        type: DataTypes.ENUM(
            'baixa',
            'media',
            'alta',
            'urgente'
        ),
        allowNull: false,
        defaultValue: 'media'
    },

    category: {
        type: DataTypes.STRING,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    assignedTo: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'tickets',
    timestamps: true
});

module.exports = Ticket;