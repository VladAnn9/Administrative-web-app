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

mainTables.get('/tableNames/:name', (req, res) => {
    pool.query(`SELECT id, nazwa FROM ${req.params.name} WHERE aktywny = 1`, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

mainTables.put('/:id', (req, res) => {
    const t = req.body;
    console.log(t);
    pool.query(`UPDATE ${req.query.name} SET ? WHERE id = ?`, [t, req.params.id], (err, result) => {
        if(err) {
            res.status(403).json('Something wrong with your data. Try again!');
            throw err;
        }
        res.status(201).send({Message: `${req.query.name} with id ${req.params.id} was updated.`});
    });
});

mainTables.post('/:name', (req, res) => {
    const t = req.body;
    console.log(req.query.name);
    console.log(t);
    pool.query(`INSERT INTO ${req.params.name} SET ?`, t, (err, result) => {
        if(err) {
            res.status(403).json('Something wrong with your data. Try again!');
            throw err;
        }
        res.status(201).send({Message: `${req.params.name} with id ${result.insertId} was added.`});
    });
});

mainTables.delete('/:id', (req, res) => {
    const table = req.query.name;
    pool.query(`DELETE FROM ${table} WHERE id = ?`, req.params.id, (err, result) => {
        if (err) throw err;

        res.status(200).send({Message: `Item with id ${req.params.id} was deleted.`})
    });
});

module.exports = mainTables;