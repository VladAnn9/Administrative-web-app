const jwt = require('jsonwebtoken');
const users = require('express').Router();

const pool = require('../data/config');

process.env.SECRET_KEY = 'secret';

users.get('/user/authenticate', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    // console.log(decoded);
    
    pool.query('SELECT * FROM uzytkownicy WHERE id = ? && aktywny = 1', decoded.id, (err, result) => {
        if(err) throw err;

        if(result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).send('User does not exist');
        }
    });
});

users.get('/', (req, res) => {
    pool.query('SELECT * FROM uzytkownicy', (err, result) => {
        if(err) throw err;

        res.send(result);
    });
});

users.get('/name/:id', (req, res) => {
    pool.query('SELECT uzytkownicy.nazwa FROM uzytkownicy WHERE id = ?', req.params.id, (err, result) => {
        if (err) throw err;

        res.status(200).send(result[0]);
    });
});

users.get('/role/:id', (req, res) => {
    pool.query('SELECT uzytkownicy.uprawnienie FROM uzytkownicy WHERE id = ?', req.params.id, (err, result) => {
        if (err) throw err;

        res.status(200).send(result[0]);
    });
});

module.exports = users;