"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get("/users", (request, response, next) => {
            users_model_1.User.find().then(users => {
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
        application.post('/users', (request, response, next) => {
            // const { name, email, password } = request.body
            let newUser = new users_model_1.User(request.body);
            newUser.save().then(user => {
                // user.password = ''
                response.status(201);
                response.json({ user });
                return next();
            });
        });
        application.get('/next', [
            (request, response, next) => {
                if (request.userAgent().includes('Mozilla/4.0')) {
                    let error = new Error();
                    error.message = "Please, update your browser.";
                    error.statusCode = 400;
                    return next(error);
                }
                return next();
            },
            (request, response, next) => {
                response.setHeader("content-type", "application/json");
                response.status(200);
                response.json({
                    browser: request.userAgent(),
                    method: request.method,
                    url: request.url,
                    path: request.path(),
                    query: request.query
                });
                return next();
            }
        ]);
    }
}
exports.usersRouter = new UsersRouter();
