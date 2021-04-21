const jwt = require('jsonwebtoken');
const users = require('express').Router();

const pool = require('../data/config');

process.env.SECRET_KEY = 'secret';

users.get('/user/authenticate', (req, res, next) => {
    const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    
    pool.query('SELECT uzytkownicy.*, lokalizacje.nazwa AS location FROM uzytkownicy LEFT JOIN lokalizacje ON       lokalizacje.id = uzytkownicy.lokalizacjaId WHERE uzytkownicy.id = ? && uzytkownicy.aktywny = 1',            decoded.id, (err, result) => {
        if(err) return next(err);

        if(result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).send('User does not exist');
        }
    });
});

users.get('/', (req, res, next) => {
    pool.query('SELECT * FROM uzytkownicy', (err, result) => {
        if(err) return next(err);

        res.send(result);
    });
});

users.get('/name/:id', (req, res, next) => {
    pool.query('SELECT uzytkownicy.nazwa FROM uzytkownicy WHERE id = ?', req.params.id, (err, result) => {
        if (err) return next(err);

        res.status(200).send(result[0]);
    });
});

users.get('/role/:id', (req, res, next) => {
    pool.query('SELECT uzytkownicy.uprawnienie FROM uzytkownicy WHERE id = ?', req.params.id, (err, result) => {
        if (err) return next(err);

        res.status(200).send(result[0]);
    });
});

module.exports = users;