"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get("/users", (request, response, next) => {
            users_model_1.User.find().then(this.render(response, next));
        });
        application.get('/users/:id', (request, response, next) => {
            const id = request.params.id;
            users_model_1.User.findById(id).then(this.render(response, next));
        });
        application.post('/users', (request, response, next) => {
            let newUser = new users_model_1.User(request.body);
            newUser.save().then(user => {
                // user.password = ''
                response.status(201);
                response.json({ user });
                return next();
            });
        });
        application.put('/users/:id', (request, response, next) => {
            let options = { useFindAndModify: false, overwrite: true };
            users_model_1.User.findByIdAndUpdate({ _id: request.params.id }, request.body, options)
                .then(result => {
                if (result) {
                    return users_model_1.User.findById(request.params.id);
                }
                else {
                    response.status(404);
                    response.json({ error: "not found" });
                }
            }).then(user => {
                response.json(user);
                return next();
            })
                .catch(error => {
                response.json({ error });
                return next();
            });
        });
        application.patch('/users/:id', (request, response, next) => {
            let options = { new: true, useFindAndModify: false };
            users_model_1.User.findByIdAndUpdate(request.params.id, request.body, options)
                .then(this.render(response, next));
        });
        application.del('/users/:id', (request, response, next) => {
            users_model_1.User.findByIdAndDelete({ _id: request.params.id })
                .then(result => {
                var _a;
                if ((_a = result) === null || _a === void 0 ? void 0 : _a.$isDeleted) {
                    response.status(204);
                    response.json({ result });
                    return next();
                }
                else {
                    response.status(400);
                    response.json({ message: "Could not find user" });
                    return next();
                }
            }).catch(error => {
                response.json({ error });
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
