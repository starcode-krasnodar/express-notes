'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        fio: {
            allowNull: false,
            comment: 'Surname, name and patronymic',
            validate: {
                notEmpty: true
            },
            type: DataTypes.STRING
        },
        phone: {
            allowNull: false,
            validate: {
                notEmpty: true
            },
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
            set: function (val) {
                this.setDataValue('email', val.toLowerCase());
            },
            validate: {
                isEmail: true
            }
        },
        password: {
            allowNull: false,
            validate: {
                notEmpty: true
            },
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ]
    });
};
