"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = (request, response, error, done) => {
    error.toJSON = () => {
        return {
            message: error.message
        };
    };
    switch (error.name) {
        case 'MongoError':
            if (error.code === 1100) {
                error.statusCode = 400;
            }
            break;
        case 'ValidationError':
            error.statusCode = 400;
            const messages = [];
            for (let name in error.errors) {
                messages.push({ message: error.errors[name].message });
            }
            error.toJSON = () => ({
                errors: messages
            });
            break;
    }
    done();
};
