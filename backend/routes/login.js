const jwt = require('jsonwebtoken');
const login = require('express').Router();

// Load the MySQL pool connection
const pool = require('../data/config');

process.env.SECRET_KEY = 'secret';

login.post('/', (req, res, next) => {
    pool.query('SELECT * FROM uzytkownicy WHERE nazwa = ?', req.body.nazwa, (err, result, fields) => {
        if(err) return next(err);

        if (result.length > 0) {
            let user = JSON.parse(JSON.stringify(result[0]));
         
            if(user.haslo === req.body.haslo) {
                let token = jwt.sign(user, process.env.SECRET_KEY, {
                    expiresIn: '5h'
                });

                user.token = token;
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.status(403).send('User does not exist');
        } 
    });
});

module.exports = login;