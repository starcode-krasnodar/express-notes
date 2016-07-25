'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Note', {
        content: {
            allowNull: false,
            validate: {
                notEmpty: true
            },
            type: DataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.User, { onDelete: 'CASCADE' });
            }
        }
    });
};
