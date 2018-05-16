const express = require('express');
const mongoose = require('mongoose');

const User = require('./User/User.js');

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

// POST method for register
server.post('/api/register', (req, res) => {

    User
    .create(req.body)
    .then(user => {
        res.json({ user })
    })
    .catch(err => {
        res.json(err)
    })
})

server.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    User
    .findOne({ username })
    .then(user => {
        if (user) {
            res.send('Logged in')
        } else {
            res.status(401).send('You shall not pass!');
        }
    })
    .catch(err => {
        res.status(401).send('You shall not pass!');
    })
})

server.get('/api/users', (req, res) => {

    User
    .find()
    .then(users => {
        res.status(200).json({ users })
    })
    .catch(err => {
        res.status(401).send('You shall not pass!')
    })
})


const port = 3000;
server.listen(port, () => console.log(`This is running on port: ${port}`))