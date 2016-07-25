#!/usr/bin/env node

var models = require('../models'),
    logger = require('../logger'),
    sequelize = models.sequelize;

sequelize
    .authenticate()
    .then(function () {
        logger.log('debug', 'Connection has been established successfully.');
    })
    .catch(function (err) {
        logger.log('error', 'Unable to connect to the database:', err);
    });

sequelize.sync({force: true})
    .then(function () {
        logger.log('debug', 'Tables successfully created.');
    }).catch(function (err) {
        logger.log('error', 'Unable to create tables: ', err);
    });
