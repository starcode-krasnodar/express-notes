'use strict';

var LocalStrategy = require('passport-local').Strategy,
    User = require('../models').User,
    bcrypt = require('bcryptjs'),
    consts = require('../config/constants');;

function validateEmail(email) {
    return /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email);
}

module.exports = function (passport) {

    var createHash = function (password) {
        return bcrypt.hashSync(password, 10);
    };

    passport.use('signup', new LocalStrategy({
            passReqToCallback: true,
            usernameField: 'email'
        },
        function (req, username, password, done) {
            var phone = req.body.phone.trim(),
                fio = req.body.fio.trim();

            if (fio === '' || phone === '' || username.trim() === '' || password === '') {
                return done(null, false, req.flash('message', consts.MISSING_CREDENTIALS));
            }

            if (!validateEmail(username)) {
                return done(null, false, req.flash('message', consts.INCORRECT_EMAIL));
            }

            password = password.trim();
            if (password !== req.body['password-repeat'].trim()) {
                return done(null, false, req.flash('message', consts.PASSWORDS_NOT_EQUAL));
            }

            User.findOne({where: {'email': username}}).then(function (user) {
                if (user) {
                    return done(null, false, req.flash('message', consts.USER_EXISTS));
                }

                User.create({
                    phone: phone,
                    password: createHash(password),
                    email: username.trim(),
                    fio: fio
                }).then(function (user) {
                    return done(null, user);
                }).catch(function (err) {
                    return done(err);
                });
            }).catch(function (err) {
                return done(err);
            });
        })
    );
};