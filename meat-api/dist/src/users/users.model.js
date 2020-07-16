"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validators_1 = require("../common/validators");
const bcrypt_1 = __importDefault(require("bcrypt"));
const environment_1 = require("../common/environment");
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    }
});
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        bcrypt_1.default.hash(user.password, environment_1.environment.security.saltRounds)
            .then(hash => {
            user.password = hash;
            next();
        })
            .catch(next);
    }
});
userSchema.pre('findOneAndUpdate', function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        bcrypt_1.default.hash(this.getUpdate().password, environment_1.environment.security.saltRounds)
            .then(hash => {
            this.getUpdate().password = hash;
            next();
        })
            .catch(next);
    }
});
userSchema.pre('update', function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        bcrypt_1.default.hash(this.getUpdate().password, environment_1.environment.security.saltRounds)
            .then(hash => {
            this.getUpdate().password = hash;
            next();
        })
            .catch(next);
    }
});
exports.User = mongoose_1.default.model('User', userSchema);
