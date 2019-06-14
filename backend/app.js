const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors'); // TODO -> i can manage to which server give response 

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true, 
}));
app.use(cors());

app.use('/', routes);

// routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});

