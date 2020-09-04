const express = require('express');
const app = express();
const assert = require("assert");
const config = require("./config");
const AppRoutes = require('./app-routes');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

let context = {};

MongoClient.connect(config.dbUrl, (err, client) => {
    console.log("Connected successfully to server");

    context.dbClient = client.db('express_test_app_db');

    //client.close();
});

app.use(bodyParser.json());

app.use(function(req, res, next){
    req.db = context.dbClient;

    next();
});

new AppRoutes(app);

app.listen(config.port, () => console.log(`Listening on port ${config.port}!`));