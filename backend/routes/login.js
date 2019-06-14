const jwt = require('jsonwebtoken');
const login = require('express').Router();

// Load the MySQL pool connection
const pool = require('../data/config');

process.env.SECRET_KEY = 'secret';

login.post('/', (req, res) => {
    pool.query('SELECT * FROM uzytkownicy WHERE nazwa = ?', req.body.nazwa, (err, result, fields) => {
        if(err) throw err;

        if (result.length > 0) {
            let user = JSON.parse(JSON.stringify(result[0]));
            console.log(user);
            if(user.haslo === req.body.haslo) {
                let token = jwt.sign(user, process.env.SECRET_KEY, {
                    expiresIn: '1h'
                });

                user.token = token;
                res.json(user);
            } else {
                // res.json('User does not exist');
                res.sendStatus(403);
            }
        } else {
            res.status(403).send('User does not exist');
        } 
    });
});

module.exports = login;