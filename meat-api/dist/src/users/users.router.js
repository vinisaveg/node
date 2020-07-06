"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get("/users", (request, response, next) => {
            users_model_1.User.findAll().then(users => {
                response.json({ users });
            });
        });
        application.get('/users/:id', (request, response, next) => {
            const id = request.params.id;
            users_model_1.User.findById(id).then(user => {
                if (user) {
                    response.json({ user });
                    return next();
                }
                response.status(404);
                response.json({ error: "User not found" });
                return next();
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
