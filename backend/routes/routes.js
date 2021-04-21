const routes = require('express').Router();
const login = require('./login');
const users = require('./users');
const documents = require('./documents');
const mainTables = require('./main-tables');
const settings = require('./settings');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.use('/login', login);
routes.use('/users', users);
routes.use('/documents', documents);
routes.use('/mainTables', mainTables);
routes.use('/', settings);

module.exports = routes;


