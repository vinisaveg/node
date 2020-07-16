"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
const restify_errors_1 = require("restify-errors");
class UsersRouter extends router_1.Router {
    constructor() {
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
            // delete document.password
        });
    }
    applyRoutes(application) {
        application.get("/users", (request, response, next) => {
            users_model_1.User.find()
                .then(this.render(response, next))
                .catch(next);
        });
        application.get('/users/:id', (request, response, next) => {
            const id = request.params.id;
            users_model_1.User.findById(id)
                .then(this.render(response, next))
                .catch(next);
        });
        application.post('/users', (request, response, next) => {
            let newUser = new users_model_1.User(request.body);
            newUser.save()
                .then(this.render(response, next))
                .catch(next);
        });
        application.put('/users/:id', (request, response, next) => {
            let options = { useFindAndModify: false, overwrite: true };
            users_model_1.User.findByIdAndUpdate({ _id: request.params.id }, request.body, options)
                .then(result => {
                if (result) {
                    return users_model_1.User.findById(request.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError({ error: "not found" });
                }
            })
                .then(this.render(response, next))
                .catch(next);
        });
        application.patch('/users/:id', (request, response, next) => {
            let options = { new: true, useFindAndModify: false };
            users_model_1.User.findByIdAndUpdate(request.params.id, request.body, options)
                .then(this.render(response, next))
                .catch(next);
        });
        application.del('/users/:id', (request, response, next) => {
            users_model_1.User.findByIdAndDelete({ _id: request.params.id })
                .then(result => {
                response.status(204);
                response.json({ result });
                return next();
            })
                .catch(next);
        });
        // TEST
        //     application.get('/next', 
        //     [
        //         (request, response, next) => {
        //         if(request.userAgent().includes('Mozilla/4.0')){
        //                 let error: any = new Error()
        //                 error.message = "Please, update your browser."
        //                 error.statusCode = 400
        //                 return next(error)
        //         }
        //             return next()
        //         },
        //         (request, response, next) => {
        //         response.setHeader("content-type", "application/json")
        //         response.status(200)
        //         response.json({
        //             browser: request.userAgent(),
        //             method: request.method,
        //             url: request.url,
        //             path: request.path(),
        //             query: request.query
        //         })
        //         return next()
        //         }
        //     ]
        // )
    }
}
exports.usersRouter = new UsersRouter();
