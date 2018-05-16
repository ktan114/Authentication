const express = require('express');
const mongoose = require('mongoose');

// Initialize server
const server = express();

// Connect to mongo
mongoose
.connect(`mongodb://localhost/authendb`)
.then(connect => {
    console.log('Connected!')
})
.catch(err => {
    console.log('Not connected!')
})

// Middleware
server.use(express.json());

// Initial route
server.get('/', (req, res) => {
    res.send('api running');
})

const port = 3000;
server.listen(port, () => console.log(`This is running on port: ${port}`))