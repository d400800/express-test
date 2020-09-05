const Repository = require('../shared/repository');

class TodoRepository extends Repository {
    constructor() {
        super({
            config: {
                collection: 'todos'
            }
        });
    }
}

module.exports = new TodoRepository();