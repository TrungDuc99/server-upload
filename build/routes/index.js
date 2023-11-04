"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.FileRouter = void 0;
var file_1 = __importDefault(require("./file"));
exports.FileRouter = file_1.default;
var Auth_1 = __importDefault(require("./Auth"));
exports.AuthRouter = Auth_1.default;
