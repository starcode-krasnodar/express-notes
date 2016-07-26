'use strict';

var router = require('express').Router(),
    isAuthenticated = require('../middleware/authentificated'),
    db = require('../models');

router.use(isAuthenticated);

router.get('/', isAuthenticated, function (req, res) {
    req.user.getNotes().then(notes => {
        res.render('notes/index', {
            notes: notes,
            title: 'Заметки'
        });
    });
});

router.get('/:id/update', function (req, res) {
    db.Note.findById(req.params.id).then(note => {
        if (note === null) {
            return res.status(404).send('Not found');
        }

        if (note.UserId != req.user.id) {
            return res.status(403).send('Forbidden');
        }

        res.render('notes/edit', {
            note: note,
            title: 'Заметка #' + note.id,
            content: note.content
        });
    });
});

router.get('/create', function (req, res) {
    res.render('notes/edit', {
        title: 'Создание заметки',
        content: ''
    });
});

router.post('/create', function (req, res) {
    db.Note.create({
        content: req.body.content
    }).then((note) => {
        note.setUser(req.user).then(() => res.redirect('/notes'));
    });
});

router.post('/:id/update', function (req, res) {
    db.Note.findById(req.params.id).then(note => {
        if (note === null) {
            return res.status(404).send('Not found');
        }

        if (note.UserId != req.user.id) {
            return res.status(403).send('Forbidden');
        }

        note
            .update({content: req.body.content})
            .then(() => {
                res.redirect('/notes');
            });
    });
});

router.post('/:id/remove', function (req, res) {
    db.Note.findById(req.params.id).then(note => {
        if (note === null) {
            return res.status(404).send('Not found');
        }

        if (note.UserId != req.user.id) {
            return res.status(403).send('Forbidden');
        }

        note.destroy().then(() => {
            res.redirect('/notes');
        });
    });
});

module.exports = router;
