const mainTables = require('express').Router();

// Load the MySQL pool connection
const pool = require('../data/config');

mainTables.get('/length', (req, res) => {
    pool.query(`SELECT COUNT(*) FROM ${req.query.table}`, (err, result) => {
        if(err) throw err;

        res.status(200).json({ totalNumber: Object.values(result[0])[0] });
    });
});

mainTables.get('/columnsNames/:table', (req, res) => {
    console.log(req.params.table);

    pool.query(`SHOW COLUMNS FROM ${req.query.table}`, (err, result, fields) => {
        if(err) throw err;
   
        let columns = result.map(val => val.Field);
        res.status(200).json({columns: columns});
    });
});

mainTables.get('/findMainTables', (req, res) => {
    const queryParams = req.query;

    const sortOrder = queryParams.sortOrder,
        sortActive = queryParams.sortActive,
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize),
        table = queryParams.table;

    const sql = `SELECT * FROM ${table} ORDER BY ${sortActive} ${sortOrder}`;

    pool.query(sql, (err, result) => {
        if(err) throw err;

        const initialPos = pageNumber * pageSize;

        const tablePage = result.slice(initialPos, initialPos + pageSize);
        console.log(tablePage);

        res.status(200).json({payload: tablePage});
    });
});

module.exports = mainTables;