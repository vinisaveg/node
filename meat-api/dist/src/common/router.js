"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { EventEmitter } from 'events'
class Router {
    render(response, next) {
        return (document) => {
            if (document) {
                response.json(document);
            }
            else {
                response.send(404);
            }
            return next();
        };
    }
}
exports.Router = Router;
