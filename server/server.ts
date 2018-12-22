const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
// equivalent of older: const express = require('express')
import * as express from 'express';
const app = express();
// Allow any method from any host and log requests
app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

const USERS = [
    { 'id': 1, 'username': 'oz' },
];

function getUsers() {
    return USERS;
}

// Handle POST requests that come in formatted as JSON
app.use(express.json());
// A default hello word route
app.get('/', (req, res) => {
    res.send({hello: 'world'});
});

app.use(bodyParser.json());

app.use(expressJwt({secret: 'docs-stored-secret'}).unless({path: ['/api/auth']}));

app.post('/api/auth', function(req, res) {
    const body = req.body;

    const user = USERS.filter(user => user.username == body.username);
    if (user.length !== 1 || body.password != 'test') return res.sendStatus(401);

    const token = jwt.sign({userID: user[0].id}, 'docs-stored-secret', {expiresIn: '2h'});
    res.send({token});
});

// start our server on port 4201
app.listen(4201, '127.0.0.1', function () {
    console.log("Server now listening on 4201");
});