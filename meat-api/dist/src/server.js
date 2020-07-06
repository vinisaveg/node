"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = __importDefault(require("restify"));
const environment_1 = require("./common/environment");
class Server {
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify_1.default.createServer({
                    name: "meat-api",
                    version: "1.0.0"
                });
                this.application.use(restify_1.default.plugins.queryParser());
                // routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.get('/next', [
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
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initRoutes(routers).then(() => this);
    }
}
exports.Server = Server;
