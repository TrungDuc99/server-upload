"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var jwt = require('jsonwebtoken');
require('dotenv').config();
var bcrypt = require('bcrypt');
var secretKey = process.env.TOKEN_SECRET_KEY;
var secretKeyID = process.env.TOKEN_SECRET_KEY_ID_COCIAL;
var AuthCallback = /** @class */ (function () {
    function AuthCallback() {
    }
    AuthCallback.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, isPasswordValid, token, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, models_1.UserModel.findOne({ email: email })]; // find the user by email
                    case 1:
                        user = _b.sent() // find the user by email
                        ;
                        if (!user) {
                            return [2 /*return*/, res.status(401).send({ message: 'Invalid username or password' })]; // return the error message when the user does not exist
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        isPasswordValid = _b.sent();
                        if (!isPasswordValid) {
                            return [2 /*return*/, res.status(401).send({ message: 'Invalid username or password' })];
                        }
                        token = jwt.sign({
                            user: {
                                uid: user._id,
                                typeAccount: user.typeAccount,
                                email: user.email,
                                name: user.name,
                                phone: user.phone,
                                address: user.address,
                            },
                        }, secretKey
                        // {
                        //   expiresIn: '30s', // expires in 30 days
                        // }
                        );
                        return [2 /*return*/, res.status(200).send({ token: token })];
                    case 3:
                        err_1 = _b.sent();
                        res.status(500).json({ error: err_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthCallback.loginBySocial = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, data, user, token, payload, token, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, id = _a.id, data = _a.data;
                        return [4 /*yield*/, models_1.UserModel.findOne({ id: id })];
                    case 1:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 2];
                        token = jwt.sign({
                            user: {
                                uid: user._id,
                                id: user.id,
                                avatarUrl: user.avatarUrl,
                                typeAccount: user.typeAccount,
                                email: user.email,
                                name: user.name,
                                phone: user.phone,
                                address: user.address,
                                isAdmin: user.isAdmin,
                            },
                        }, secretKey);
                        return [2 /*return*/, res.status(200).send({ token: token, newUser: false })];
                    case 2: return [4 /*yield*/, models_1.UserModel.create(__assign(__assign({}, data), { password: '' }))];
                    case 3:
                        payload = _b.sent();
                        token = jwt.sign({
                            user: {
                                uid: payload._id,
                                id: payload.id,
                                avatarUrl: payload.avatarUrl,
                                typeAccount: payload.typeAccount,
                                email: payload.email,
                                name: payload.name,
                                phone: payload.phone,
                                address: payload.address,
                            },
                        }, secretKey);
                        return [2 /*return*/, res.status(200).send({ token: token, newUser: true, data: payload })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        res.status(500).json({ error: err_2 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthCallback.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, id, name, password, phone, address, avatarUrl, hashedPassword, payload, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, id = _a.id, name = _a.name, password = _a.password, phone = _a.phone, address = _a.address, avatarUrl = _a.avatarUrl;
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 1:
                        hashedPassword = _b.sent();
                        return [4 /*yield*/, models_1.UserModel.create({
                                email: email,
                                name: name,
                                id: id,
                                typeAccount: 0,
                                password: hashedPassword,
                                phone: phone,
                                avatarUrl: avatarUrl,
                                address: address,
                            })];
                    case 2:
                        payload = _b.sent();
                        return [2 /*return*/, res.json({ succeeded: true, data: payload })];
                    case 3:
                        err_3 = _b.sent();
                        res.status(500).json({ error: err_3 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthCallback.registerBySocial = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, id, name, birthday, avatarUrl, typeAccount, payload, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, id = _a.id, name = _a.name, birthday = _a.birthday, avatarUrl = _a.avatarUrl, typeAccount = _a.typeAccount;
                        return [4 /*yield*/, models_1.UserModel.create({
                                email: email,
                                name: name,
                                typeAccount: typeAccount,
                                id: id,
                                birthday: birthday,
                                avatarUrl: avatarUrl,
                            })];
                    case 1:
                        payload = _b.sent();
                        return [2 /*return*/, res.json({ succeeded: true, data: payload })];
                    case 2:
                        err_4 = _b.sent();
                        res.status(500).json({ error: err_4 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthCallback.logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, image, id, payload, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name = _a.name, description = _a.description, image = _a.image, id = _a.id;
                        return [4 /*yield*/, models_1.UserModel.create({
                                name: name,
                                id: id,
                                description: description,
                                image: image,
                            })];
                    case 1:
                        payload = _b.sent();
                        return [2 /*return*/, res.json({ succeeded: true, data: payload })];
                    case 2:
                        err_5 = _b.sent();
                        res.status(500).json({ error: err_5 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthCallback.me = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userID, id, payload, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userID = req.user.user._id // Lấy id của user.
                        ;
                        id = req.user.user.id;
                        payload = void 0;
                        if (!userID) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.UserModel.findOne({ _id: userID })];
                    case 1:
                        payload = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!id) return [3 /*break*/, 4];
                        return [4 /*yield*/, models_1.UserModel.findOne({ id: id })];
                    case 3:
                        payload = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!payload) {
                            return [2 /*return*/, res.status(404).send({ message: 'User not found' })];
                        }
                        return [2 /*return*/, res.send(payload)];
                    case 5:
                        err_6 = _a.sent();
                        res.status(500).json({ error: err_6 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return AuthCallback;
}());
exports.default = AuthCallback;
var a = {
    user: {
        $__: {
            activePaths: {
                paths: {
                    typeAccount: 'require',
                },
                states: {
                    require: {
                        typeAccount: true,
                    },
                    default: {},
                    modify: {},
                },
            },
            op: null,
            saving: null,
            $versionError: null,
            saveOptions: null,
            validating: null,
            cachedRequired: {},
            backup: {
                activePaths: {
                    modify: {
                        email: true,
                        typeAccount: true,
                        id: true,
                        name: true,
                        avatarUrl: true,
                        password: true,
                    },
                    default: {
                        isAdmin: true,
                        gender: true,
                        phone: true,
                        address: true,
                        created: true,
                        birthday: true,
                        _id: true,
                    },
                },
                validationError: null,
            },
            inserting: true,
            savedState: {},
        },
        _doc: {
            email: 'ducga0ro1234@gmail.com',
            typeAccount: 1,
            isAdmin: true,
            gender: '',
            id: '1312341403038732',
            name: 'Trung Đức',
            avatarUrl: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1312341403038732&height=200&width=200&ext=1700619795&hash=AeQ1e81UlNh0h6RQYr0',
            password: '',
            phone: '',
            address: '',
            created: '2023-10-23T02:22:47.655Z',
            birthday: '',
            _id: '6535d91319cc7df01083d88e',
            __v: 0,
        },
        $isNew: false,
    },
    iat: 1698027795,
};
