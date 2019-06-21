const documents = require('express').Router();

// Load the MySQL pool connection
const pool = require('../data/config');

documents.get('/docN/:id', (req, res) => {
    pool.query(`SELECT * FROM dokumenty_n WHERE dokumenty_n.id = ?`, req.params.id, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).send(result[0]);
    });
});

documents.get('/products/length', (req, res) => {
    pool.query(`SELECT COUNT(*) FROM materialy WHERE aktywny = 1`, (err, result) => {
        if(err) throw err;

        res.status(200).json({ totalNumber: Object.values(result[0])[0] });
    });
});

documents.get('/products/:id', (req, res) => {
    const sql = `SELECT materialy.nazwa, materialy.id FROM materialy WHERE materialy.nazwa NOT IN (SELECT materialy.nazwa FROM materialy LEFT JOIN dokumenty_p ON materialy.id = dokumenty_p.materialy_id WHERE dokumenty_p.dok_N_id = ${req.params.id})`
    pool.query(sql, (err, result) => {
        if(err) throw err;
        console.log("RESULT");
        console.log(result);
        res.status(200).send(result);
    });
});

documents.get('/documentN/length/:id', (req, res) => {
    pool.query('SELECT COUNT(*) FROM dokumenty_n WHERE dokumenty_n.rodzaj_dok = ? AND dokumenty_n.uzytkownik_id = ?', [req.query.type, req.params.id], (err, result) => {
        if(err) throw err;

        res.status(200).json({ totalNumber: Object.values(result[0])[0] });
    });
});

documents.get('/documentP/length', (req, res) => {
    pool.query('SELECT COUNT(*) FROM dokumenty_p WHERE dokumenty_p.dok_N_id = ?', req.query.idN, (err, result) => {
        if(err) throw err;

        res.status(200).json({ totalNumber: Object.values(result[0])[0] });
    });
});

documents.get('/findNewTable', (req, res) => {
    const queryParams = req.query;

    const filter = queryParams.filter || '',
        sortOrder = queryParams.sortOrder,
        sortActive = queryParams.sortActive,
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize),
        IDN = parseInt(queryParams.IDN);
    
    let sql;
    if(IDN) {
        sql = `SELECT materialy.id, materialy.nazwa, grupy.nazwa AS grupa, dokumenty_p.ilosc, dokumenty_p.stan, dokumenty_p.cena, dokumenty_p.uwagi FROM materialy JOIN grupy ON (materialy.grupa_id = grupy.id) LEFT JOIN dokumenty_p ON (dokumenty_p.dok_N_id = ${IDN} AND dokumenty_p.materialy_id = materialy.id) WHERE materialy.aktywny = 1 ORDER BY ${sortActive} ${sortOrder}`;
    } else {
        sql = `SELECT materialy.id, materialy.nazwa, grupy.nazwa AS grupa FROM materialy INNER JOIN grupy ON materialy.grupa_id = grupy.id WHERE materialy.aktywny = 1 ORDER BY ${sortActive === 'ilosc' ? 'nazwa' : sortActive} ${sortOrder}`;
    }
    
    pool.query(sql, (err, result) => {
        if(err) throw err;

        let products = Object.values(result);
        if (filter) {
            products = result.filter(product => product.grupa.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
        }

        const initialPos = pageNumber * pageSize;

        const productsPage = products.slice(initialPos, initialPos + pageSize);
        // console.log(productsPage);

        res.status(200).json({payload: productsPage});
    });
});

documents.get('/findManageData/:id', (req, res) => {
    const queryParams = req.query;

    const sortOrder = queryParams.sortOrder,
        sortActive = queryParams.sortActive,
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize),
        type = queryParams.type,
        userID = req.params.id;

    pool.query('SELECT uzytkownicy.uprawnienie FROM uzytkownicy WHERE uzytkownicy.id = ?', 
        userID, (err, result)=> {
            if(err) throw err;
            console.log(result);
            const role = result[0].uprawnienie;
            if (role === 'root' || role === 'admin') {
                const sql = `SELECT dokumenty_n.id, dokumenty_n.data, lokalizacje.nazwa AS lokal, dokumenty_n.status FROM dokumenty_n
                LEFT JOIN uzytkownicy ON dokumenty_n.uzytkownik_id = uzytkownicy.id LEFT JOIN lokalizacje ON uzytkownicy.lokalizacjaId = lokalizacje.id WHERE dokumenty_n.rodzaj_dok = '${type}' ORDER BY ${sortActive} ${sortOrder}`;
                getDocuments(sql);
            } else {
                const sql = `SELECT dokumenty_n.id, dokumenty_n.data, lokalizacje.nazwa AS lokal, dokumenty_n.status FROM dokumenty_n
                LEFT JOIN uzytkownicy ON dokumenty_n.uzytkownik_id = uzytkownicy.id LEFT JOIN lokalizacje ON uzytkownicy.lokalizacjaId = lokalizacje.id WHERE dokumenty_n.rodzaj_dok = '${type}' AND dokumenty_n.uzytkownik_id = ${userID} ORDER BY ${sortActive} ${sortOrder}`;
                getDocuments(sql);
            }
    });
    
    function getDocuments (sql) {
        pool.query(sql, (err, result) => {
            if(err) throw err;
    
            const initialPos = pageNumber * pageSize;
    
            const tablePage = result.slice(initialPos, initialPos + pageSize);
            console.log(tablePage);
    
            res.status(200).json({payload: tablePage});
        });

    };
});

documents.get('/findDocumentPData', (req, res) => {
    const queryParams = req.query;

    const sortOrder = queryParams.sortOrder,
        sortActive = queryParams.sortActive,
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize),
        idN = queryParams.id;

    let sql = `
        SELECT dokumenty_p.id, materialy.nazwa, dokumenty_p.ilosc, dokumenty_p.stan, summary.stanMag,
        dokumenty_p.uwagi, dokumenty_p.cena FROM dokumenty_p LEFT JOIN materialy ON materialy.id = dokumenty_p.materialy_id 
        LEFT OUTER JOIN (SELECT SUM(dokumenty_p.ilosc * dokumenty_n.mnoznik) as stanMag, dokumenty_p.materialy_id as materialy FROM dokumenty_p LEFT JOIN dokumenty_n ON dokumenty_n.id = dokumenty_p.dok_N_id GROUP BY dokumenty_p.materialy_id) summary 
        ON summary.materialy = dokumenty_p.materialy_id
        WHERE dokumenty_p.dok_N_id = ${idN} ORDER BY ${sortActive} ${sortOrder}
    `;

    pool.query(sql, (err, result) => {
        if(err) throw err;

        const initialPos = pageNumber * pageSize;

        const tablePage = result.slice(initialPos, initialPos + pageSize);
        console.log(tablePage);

        res.status(200).json({payload: tablePage});
    });
});

documents.post('/', (req, res) => {
    const p = req.body.documentP;
    p.stan = Number(p.stan) ? Number(p.stan) : p.stan = 0;
    p.cena = Number(p.cena) ? Number(p.cena) : p.cena = null;

    // First time when posting dokumenty_N and dokumenty_P together and creating new order
        pool.query('INSERT INTO dokumenty_N SET ?', req.body.documentN, (err, result) => {
            if (err) throw err;
            if(result.insertId) {
                const sql = 'INSERT INTO dokumenty_P (materialy_id, ilosc, dok_N_id, stan, cena, uwagi) VALUES (?, ?, ?, ?, ?, ?)';
    
                const docP = [p.id, p.ilosc, result.insertId, p.stan, p.cena, p.uwagi];
                pool.query(sql, docP, (errP, resultP) => {
                    if (errP) throw errP;
                    res.status(201).send({ 
                        Message: 'Document added',
                        IDN: result.insertId,
                        idP: resultP.insertId
                    });
                });
            } else {
                res.status(404).send({Message: 'Not found parent ID'});
            }
        }); 
});

documents.put('/n/:id', (req, res) => {
    let doc = req.body;
    // doc.data = Date(req.body.data);
    console.log(req.body);
    pool.query('UPDATE dokumenty_n SET ? WHERE id = ?', [doc, req.params.id], (err, result) => {
        if (err) throw err;

        res.status(201).send({Message: `Document with id: ${req.params.id} sended successfully.`});
    });
});

documents.put('/single-p/:id', (req, res) => {
    const p = req.body;
    p.cena = Number(p.cena) ? Number(p.cena) : p.cena = null;

    pool.query(`UPDATE dokumenty_p SET ilosc = ${p.ilosc}, stan = ${p.stan}, uwagi = '${p.uwagi}', cena = ${p.cena} WHERE id = ?`, req.params.id, (err, result) => {
        if(err) throw err;
        res.status(201).send({Message: 'Document P updated.'});
    });
});

documents.put('/p/:id', (req, res) => {
    const p = req.body;
    p.stan = Number(p.stan) ? Number(p.stan) : p.stan = 0;
    p.cena = Number(p.cena) ? Number(p.cena) : p.cena = null;

// Then if order is created I am posting or updating items in that order
    const docP = [p.id, p.ilosc, req.params.id, p.stan, p.cena, p.uwagi];
    pool.query(`UPDATE dokumenty_p SET materialy_id = ?, ilosc = ?, dok_N_id = ?, stan = ?, cena = ?, uwagi = ? WHERE materialy_id = ${p.id} && dok_N_id = ${req.params.id}`, docP, (err, result) => {
        if(err) throw err;

        if (result.affectedRows) {
            res.status(201).send({
                Message: 'Item updated'
            });
        } else {
            const sql = 'INSERT INTO dokumenty_p (materialy_id, ilosc, dok_N_id, stan, cena, uwagi) VALUES (?, ?, ?, ?, ?, ?)';
            pool.query(sql, docP, (errP, resultP) => {
                if (errP) throw errP;

                res.status(201).send({
                    Message: 'Item added',
                    idP: resultP.insertId
                });
            });
        }
    });
});

documents.delete('/p/:id', (req, res) => {
    const id = req.params.id;
    
    pool.query('DELETE FROM dokumenty_p WHERE id = ?', id, (error, result) => {
        if (error) throw error;

        res.status(200).send({Message: 'Item was deleted'});
    });
});

documents.post('/createWZ/:id', (req, res) => {
    const sql1 = `INSERT INTO dokumenty_n (dokumenty_n.uzytkownik_id, dokumenty_n.rodzaj_dok, dokumenty_n.status, dokumenty_n.mnoznik, dokumenty_n.data)
    SELECT dokumenty_n.uzytkownik_id, 'WZ', 'edycja', -1, now() FROM dokumenty_n WHERE dokumenty_n.id = ${req.params.id}`;

    pool.query(sql1, (err, result) => {
        if (err) throw err;
        if(result.affectedRows === 1) {
        
            const sql2 = `INSERT INTO dokumenty_p (dokumenty_p.materialy_id, dokumenty_p.ilosc, dokumenty_p.dok_N_id, dokumenty_p.stan, dokumenty_p.cena, dokumenty_p.uwagi)
            SELECT dokumenty_p.materialy_id, dokumenty_p.ilosc, ${result.insertId}, dokumenty_p.stan, dokumenty_p.cena, dokumenty_p.uwagi FROM dokumenty_p WHERE dokumenty_p.dok_N_id = ${req.params.id}`;

            pool.query(sql2, (err2, result2) => {
                if(err2) throw err2;
    
                if(result.affectedRows > 0) {
                    res.status(201).json({Message: 'The document dublicated in WZ.'})
                } else {
                    res.status(403).json({Message: 'Something goes wrong'});
                }
            });

        } else {    
            res.status(403).json({Message: 'Something goes wrong'});
        }
    });
});

documents.put('/statusDocN/:id', (req, res) => {
    pool.query(`UPDATE dokumenty_n SET dokumenty_n.status = ? WHERE dokumenty_n.id = ?`, [req.body.status,req.params.id], (err, result) => {
        if(err) throw err;
        res.status(201).send({Message: `Changed status on ${req.body.status} in ${req.params.id} document`});
    }); 
});

documents.get('/nTypeAndStatus/:id', (req, res) => {
    pool.query('SELECT dokumenty_n.rodzaj_dok, dokumenty_n.status FROM dokumenty_n WHERE id = ?', req.params.id, (err, result) => {
        if(err) throw err;

        res.status(200).send(result[0]);
    });
});

documents.get('/checkAccessCreateNew/:id', (req, res) => {
    const sql = `SELECT COUNT(*) FROM dokumenty_n WHERE dokumenty_n.uzytkownik_id = ${req.params.id} AND dokumenty_n.rodzaj_dok = '${req.query.type}' AND dokumenty_n.status = 'edycja'`;
    pool.query(sql, (err, result) => {
        if(err) throw err;
        const point = Object.values(result[0])[0];

        if(point === 0) {
            res.status(200).send({Access: true});
        } else {
            res.status(200).send({Access: false});
        }
    });
});

module.exports = documents;