const settings = require('express').Router();

const pool = require('../data/config');

settings.get('/settings', (req, res, next) => {
    pool.query('SELECT * FROM settings', (err, result) => {
        if(err) return next(err);

        res.status(200).send(result[0]);
    });
});

settings.put('/settings', (req, res, next) => {
    pool.query('UPDATE settings SET ?', req.body, (err, result) => {
        if(err) return next(err);

        res.status(201).send({ Message: 'Settings was updated.'});
    });
});


module.exports = settings;