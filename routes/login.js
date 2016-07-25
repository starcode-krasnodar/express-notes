'use strict';

module.exports = function(passport) {
    return function (req, res, next) {
        passport.authenticate('login', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.render('login', {
                    message: req.flash('message'),
                    username: req.body.email
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