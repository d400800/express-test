const AppRouter = require('../AppRouter')

class TodoRouter extends AppRouter {
    constructor() {
        super({
            config: {
                path: 'todos'
            }
        });
    }
}

module.exports = new TodoRouter();