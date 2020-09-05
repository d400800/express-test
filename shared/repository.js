class Repository {
    constructor(data) {
        Object.assign(this, data);
    }

    async loadDocuments(context, args) {
        const query = args;

        return new Promise((resolve, reject) => {
            context.db.collection(this.config.collection)
                .find(query)
                .toArray((err, docs) => {
                    err
                        ? reject(err)
                        : resolve(docs);
                });
        });
    }
}

module.exports = Repository;