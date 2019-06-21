const  mysql = require('mysql');

// Set database connection credentials
const config = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'early-stage'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;