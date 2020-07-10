"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = (request, response, next) => {
    if (request.getContentType() === mpContentType && request.method === 'PATCH') {
        try {
            request.body = JSON.parse(request.body);
        }
        catch (error) {
            return next(new Error(`Invalid content: ${error.message}`));
        }
    }
    return next();
};
