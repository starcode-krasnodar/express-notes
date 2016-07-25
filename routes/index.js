'use strict';

var express = require('express');
var router = express.Router();
var login = require('./login');
var signup = require('./signup');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};

module.exports = function (passport) {
    router.get('/login', function (req, res) {
        res.render('login', {message: req.flash('message'), username: ''});
    });

    router.post('/login', login(passport));

    router.get('/signup', function (req, res) {
        res.render('signup', {
            message: req.flash('message'),
            body: {
                email: '',
                fio: '',
                phone: ''
            }
        });
    });

    router.post('/signup', signup(passport));

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/', isAuthenticated, function (req, res) {
        res.render('index', {user: req.user});
    });

    return router;
};