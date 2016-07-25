'use strict';

var login = require('./login'),
    signup = require('./signup'),
    User = require('../models').User;

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                done(err, null);
            });
    });

    login(passport);
    signup(passport);
};