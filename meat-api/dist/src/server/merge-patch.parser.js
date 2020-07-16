"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = (request, response, next) => {
    if (request.getContentType() === mpContentType && request.method === 'PATCH') {
        try {
            request.body = JSON.parse(request.body);
        }
        catch (error) {
            return next(new restify_errors_1.BadRequestError(`Invalid content: ${error.message}`));
        }
    }
    return next();
};
