const routes = require('express').Router();
const login = require('./login');
const users = require('./users');
const documents = require('./documents');
const mainTables = require('./main-tables');

// Load the MySQL pool connection
const pool = require('../data/config');

process.env.SECRET_KEY = 'secret';

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.use('/login', login);
routes.use('/users', users);
routes.use('/documents', documents);
routes.use('/mainTables', mainTables);

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    //  HERE GOES PRODUCTS ROUTES
    app.get('/products', (request, response) => {
        pool.query('SELECT * FROM products', (error, result) => {
            if (error) throw error;
     
            response.send(result);
        });
    });

    // Display a single product by ID
    app.get('/products/:id', (request, response) => {
        const id = request.params.id;
       
        pool.query('SELECT * FROM products WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        })
    });

    //  HERE GOES ORDERS ROUTES
    app.get('/orders', (request, response) => {
        pool.query('SELECT * FROM orders', (error, result) => {
            if (error) throw error;
     
            response.send(result);
        });
    });
    
    app.post('/orders', (req, res) => {
        console.log(req);
        let arrOrders = [];
        req.body.map(order => {
            arrOrders.push([order.name, order.quantity, order.description, order.user]);
        });
        
        pool.query('INSERT INTO orders (name, quantity, description, user) VALUES ?', [arrOrders], (err, result) => {
            if(err) throw err;
            
            res.status(201).json(result);   // ->
            // Fixed problem with end() or json() -> because this not sending any data back, but was sended empty text that can't be parsed to JSON
        });
    });
    
    // HERE GOES LOGIN ROUTES
    // app.post('/login', (req, res) => {
    //     pool.query('SELECT * FROM uzytkownicy WHERE nazwa = ?', req.body.name, (err, result, fields) => {
    //         if(err) throw err;
            
    //         console.log(result);

    //         if (result.length > 0) {
    //             let user = JSON.parse(JSON.stringify(result[0]));`
    //             console.log(user);
    //             if(user.haslo === req.body.password) {
    //                 let token = jwt.sign(user, process.env.SECRET_KEY, {
    //                     expiresIn: '1h'
    //                 });
    
    //                 user.token = token;
    //                 res.json(user);
    //             } else {
    //                 // res.json('User does not exist');
    //                 res.sendStatus(403);
    //             }
    //         } else {
    //             res.sendStatus(403);
    //         }


            
    //     });
    // });

    // HERE GOES USER ROUTES
    // app.get('/user/authenticate', (req, res) => {
    //     const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    //     console.log(decoded);
        
    //     pool.query('SELECT * FROM users WHERE id = ?', decoded.id, (err, result) => {
    //         console.log(result);
    //         if(err) throw err;

    //         if(result[0]) {
    //             res.json(result[0]);
    //         } else {
    //             res.json('User does not exist');
    //         }
    //     });
    // });

    // app.get('/users', (req, res) => {
    //     pool.query('SELECT * FROM users', (err, result) => {
    //         if(err) throw err;

    //         res.send(result);
    //     });
    // });
    


    // OLD STUFF
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;
    
            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });

    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;
    
        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
    
            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
    
        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
    
            response.send('User deleted.');
        });
    });
}

// Export the router
// module.exports = router;
module.exports = routes;


