"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = __importDefault(require("restify"));
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./common/environment");
class Server {
    initializeDb() {
        // (<any>mongoose).Promise = global.Promise
        return mongoose_1.default.connect(environment_1.environment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify_1.default.createServer({
                    name: "meat-api",
                    version: "1.0.0"
                });
                this.application.use(restify_1.default.plugins.queryParser());
                this.application.use(restify_1.default.plugins.bodyParser());
                // routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
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
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
