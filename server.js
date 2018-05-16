const express = require('express');
const mongoose = require('mongoose');

const server = express();

// Middleware
server.use(express.json());

// Initial route
server.get('/', (req, res) => {
    res.send('api running');
})

const port = 3000;
server.listen(port, () => console.log(`This is running on port: ${port}`))