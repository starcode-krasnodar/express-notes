'use strict';
var bcrypt = require('bcryptjs'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models').User;

module.exports = function(passport) {
    var isValidPassword = function (user, password) {
        return bcrypt.compareSync(password, user.password);
    };

    passport.use('login', new LocalStrategy({
            passReqToCallback: true,
            usernameField: 'email'
        },
        function (req, username, password, done) {
            User.findOne({where: {'email': username}}).then(function (user) {
                if (!user) {
                    return done(null, false, req.flash('message', 'Не найдено пользователя с таким email'));
                }

                if (!isValidPassword(user, password)) {
                    return done(null, false,
                        req.flash('message', 'Неверный пароль'));
                }

                return done(null, user);
            }).catch(function (err) {
                return done(err);
            });
        }));
};