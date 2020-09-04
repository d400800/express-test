const express = require('express');
const ObjectId = require('mongodb').ObjectId;

class AppRouter {
    constructor(data) {
        Object.assign(this, data);
    }

    async loadDocument(req, objectId) {
        return req.db.collection(this.config.path).findOne({
            _id: objectId
        });
    }

    async loadDocuments(req) {
        return req.db.collection(this.config.path).find({});
    }

    async insertDocument(req) {
        return req.db.collection(this.config.path).insert(req.body);
    }

    registerRoutes(route, app) {
        const router = express.Router();

        router.get('/', async (req, res, next) => {
            const result = await route[`loadDocuments`](req, res);

            result.toArray((err, docs) => {
                res.json(docs);
            });
        });

        router.get('/:id', async (req, res, next) => {
            const result = await route[`loadDocument`](req, new ObjectId(req.params.id));

            res.json(result);
        });

        router.post('/', async (req, res, next) => {
            const result = await route[`insertDocument`](req);

            res.json({id: result.ops[0]._id});
        });

        app.use(`/${this.config.path}`, router);
    }
}

module.exports = AppRouter;