"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    reset({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            //Verificar se o email existe.
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                    active: true,
                }
            });
            if (!user) {
                throw new Error("User/password incorrect");
            }
            // Check Password
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new Error("User/password incorrect");
            }
            //unlock
            yield prisma_1.default.user.update({
                where: {
                    id: user.id
                },
                data: {
                    try: 0,
                    blocked: false
                }
            });
            //Generate Token
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '60m'
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
    executeSocialMedia({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            //Verificar se o email existe.
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                    active: true
                }
            });
            if (!user) {
                throw new Error("User not exists");
            }
            if (user.blocked) {
                yield prisma_1.default.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        try: 0,
                        blocked: false
                    }
                });
            }
            //Generate Token
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: process.env.TOKEN_EXPIRES ? process.env.TOKEN_EXPIRES : '60m'
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            //Verificar se o email existe.
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                    active: true
                }
            });
            if (!user) {
                throw new Error("User/password incorrect");
            }
            // Check Password
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                //increment try and block
                yield prisma_1.default.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        try: user.try + 1,
                        blocked: ((user.try + 1) > 3)
                    }
                });
                throw new Error("User/password incorrect. If there are three attempts, then user will be blocked.");
            }
            if (user.blocked) {
                yield prisma_1.default.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        try: 0,
                        blocked: false
                    }
                });
            }
            //Generate Token
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '60m'
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
