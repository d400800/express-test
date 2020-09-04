const todoRouter = require('./todo/todo-router');
const bookRouter = require('./book/book-router');

class AppRoutes {
    constructor(app) {
        this.apiRoutes = [
            todoRouter,
            bookRouter
        ];

        for (const route of this.apiRoutes) {
            route.registerRoutes(route, app);
        }
    }
}

module.exports = AppRoutes;