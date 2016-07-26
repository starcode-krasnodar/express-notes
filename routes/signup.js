'use strict';
var consts = require('../config/constants');

module.exports = function(passport) {
    return function (req, res, next) {
        passport.authenticate('signup', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                var message = req.flash('message');
                // passport-local strategy doesn't allow to change message, if authentification made by callback
                if (info && info.message === 'Missing credentials') {
                    message = consts.MISSING_CREDENTIALS;
                }

                return res.render('signup', {
                    message: message,
                    body: req.body,
                    title: 'Регистрация'
                });
            }

            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    }
};