"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
// import { EventEmitter } from 'events'
class Router {
    render(response, next) {
        return (document) => {
            if (document) {
                response.json(document);
            }
            else {
                throw new restify_errors_1.NotFoundError('Document not found');
            }
            return next();
        };
    }
}
exports.Router = Router;
