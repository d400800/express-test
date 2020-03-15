const express = require('express');
const app = express();
const assert = require("assert");
const config = require("./config");

const MongoClient = require('mongodb').MongoClient;

let context = {};

MongoClient.connect(config.dbUrl, (err, client) => {
    context.dbClient = client;
});

const routes = require("./router");

app.use(function(req,res,next){
    req.db = context.dbClient;
    next();
});

app.use(routes);

app.listen(config.port, () => console.log(`Listening on port ${config.port}!`));