const AppRouter = require('../AppRouter')

class BookRouter extends AppRouter {
    constructor() {
        super({
            config: {
                path: 'books'
            }
        });
    }
}

module.exports = new BookRouter();