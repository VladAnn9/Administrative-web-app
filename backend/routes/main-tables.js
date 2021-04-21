const mainTables = require('express').Router();

// Load the MySQL pool connection
const pool = require('../data/config');

mainTables.get('/length', (req, res, next) => {
    pool.query(`SELECT COUNT(*) FROM ${req.query.table}`, (err, result) => {
        if(err) {
            return next(err);
        }

        res.status(200).json({ totalNumber: Object.values(result[0])[0] });
    });
});

mainTables.get('/columnsNames/:table', (req, res, next) => {

    pool.query(`SHOW COLUMNS FROM ${req.query.table}`, (err, result, fields) => {
        if(err) {
            return next(err);
        }
   
        let columns = result.map(val => val.Field);
        if (req.query.table === 'uzytkownicy') {
            columns[columns.indexOf('lokalizacjaId')] = 'lokal';
        } else if (req.query.table === 'materialy') {
            columns[columns.indexOf('grupa_id')] = 'grupa';
        }
        res.status(200).json({columns: columns});
    });
});

mainTables.get('/findMainTables/:id', (req, res, next) => {
    const queryParams = req.query;

    const sortOrder = queryParams.sortOrder,
        sortActive = queryParams.sortActive,
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize),  
        table = queryParams.table,
        id = req.params.id;

    let sql;
    if (table === 'uzytkownicy') {
        sql = `SELECT uzytkownicy.id, uzytkownicy.nazwa, haslo, uprawnienie, lokalizacje.nazwa AS lokal, uzytkownicy.aktywny FROM ${table} LEFT JOIN lokalizacje ON lokalizacje.id = uzytkownicy.lokalizacjaId ORDER BY ${sortActive} ${sortOrder}`;
    } else if (table === 'materialy') {
        sql = `SELECT materialy.id, materialy.nazwa, grupy.nazwa AS grupa, materialy.ean, materialy.nazwa_skr, materialy.aktywny, materialy.ilosc_alarm FROM ${table} JOIN grupy ON grupy.id = materialy.grupa_id ORDER BY ${sortActive} ${sortOrder}`;
    } else {
        sql = `SELECT * FROM ${table} ORDER BY ${sortActive} ${sortOrder}`;
    }

    pool.query(sql, (err, result) => {
        if (err) {
            return next(err);
        }
        pool.query('SELECT uzytkownicy.uprawnienie FROM uzytkownicy WHERE id = ?', id, (err1, result1) => {
            if(err1) return next(err1);
           
            let tablePage;
            if (table === 'uzytkownicy' && result1[0].uprawnienie === 'admin') {
                result = result.filter(val => val.uprawnienie !== 'root');

                const initialPos = pageNumber * pageSize;
                tablePage = result.slice(initialPos, initialPos + pageSize);
            } else {
                const initialPos = pageNumber * pageSize;
        
                tablePage = result.slice(initialPos, initialPos + pageSize);
            }
    
            res.status(200).json({payload: tablePage});
        });

    });
});

mainTables.get('/findStanMagData', (req, res, next) => {
    const queryParams = req.query;

    const sortOrder = queryParams.sortOrder,
        sortActive = queryParams.sortActive,
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize);

    const sql = `
        SELECT materialy.id, materialy.nazwa, materialy.ilosc_alarm, summary.stan FROM materialy
        LEFT OUTER JOIN (SELECT SUM(dokumenty_p.ilosc * dokumenty_n.mnoznik) as stan, dokumenty_p.materialy_id as materialy_id FROM dokumenty_p 
        LEFT JOIN dokumenty_n ON dokumenty_n.id = dokumenty_p.dok_N_id WHERE dokumenty_n.data >= (SELECT settings.data_inwentarizacji FROM settings) 
        GROUP BY dokumenty_p.materialy_id) summary 
        ON summary.materialy_id = materialy.id WHERE materialy.aktywny = 1 ORDER BY ${sortActive} ${sortOrder} 
    `;

    pool.query(sql, (err, result) => {
        if(err) return next(err);

        const initialPos = pageNumber * pageSize;
        
        tablePage = result.slice(initialPos, initialPos + pageSize);

        res.status(200).json({payload: tablePage});
    });
});

mainTables.get('/tableNames/:name', (req, res, next) => {
    pool.query(`SELECT id, nazwa FROM ${req.params.name} WHERE aktywny = 1`, (err, result) => {
        if (err) {
            return next(err);
        }

        res.status(200).send(result);
    });
});

mainTables.put('/:id', (req, res, next) => {
    const t = req.body;
    delete t.lokal;
    delete t.grupa;

    pool.query(`UPDATE ${req.query.name} SET ? WHERE id = ?`, [t, req.params.id], (err, result) => {
        if(err) {
            res.status(403).json('Something wrong with your data. Try again!');
            return next(err);
        }
        res.status(201).send({Message: `${req.query.name} with id ${req.params.id} was updated.`});
    });
});

mainTables.post('/:name', (req, res, next) => {
    const t = req.body;

    if (req.params.name === 'uzytkownicy') {
        pool.query(`SELECT EXISTS(SELECT * FROM ${req.params.name} WHERE nazwa = ?)`, t.nazwa, (err, result) => {
            if(err) return next(err);

            if(Object.values(result[0])[0]) {
                res.status(200).json('Taka nazwa już istnieje!');
            } else {
                addNewRow();
            }
        });
    } else {
        addNewRow();
    }

    function addNewRow() {
        pool.query(`INSERT INTO ${req.params.name} SET ?`, t, (err, result) => {
            if(err) {
                res.status(403).json('Something wrong with your data. Try again!');
                return next(err);
            }
            res.status(201).send();
        });
    };
});

mainTables.delete('/:id', (req, res, next) => {
    const table = req.query.name;
    pool.query(`DELETE FROM ${table} WHERE id = ?`, req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }

        res.status(200).send({Message: `Item with id ${req.params.id} was deleted.`})
    });
});

module.exports = mainTables;