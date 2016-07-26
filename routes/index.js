'use strict';

var express = require('express'),
    router = express.Router(),
    login = require('./login'),
    signup = require('./signup'),
    isAuthenticated = require('../middleware/authentificated');

module.exports = function (passport) {
    router.get('/login', function (req, res) {
        res.render('login', {
            message: req.flash('message'),
            title: 'Вход',
            username: ''
        });
    });

    router.post('/login', login(passport));

    router.get('/signup', function (req, res) {
        res.render('signup', {
            message: req.flash('message'),
            title: 'Регистрация',
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
        req.session.save(() => {
            res.redirect('/');
        });
    });

    router.get('/', isAuthenticated, function (req, res) {
        res.render('index', {
            title: 'Главная',
            user: req.user
        });
    });

    return router;
};