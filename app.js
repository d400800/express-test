const apolloServer = require('./apollo-server');

const express = require('express');
const expressServer = express();
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

expressServer.use(bodyParser.json());

expressServer.use(function(req, res, next){
    req.db = context.dbClient;

    next();
});

new AppRoutes(expressServer);

expressServer.listen(config.port, () => console.log(`Listening on port ${config.port}!`));

apolloServer.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});