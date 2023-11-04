"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var file_1 = require("../middleware/file");
var AuthenticateToken_1 = require("../middleware/AuthenticateToken");
var file_2 = __importDefault(require("../controller/file"));
var FileRouter = (0, express_1.Router)();
FileRouter.post('/uploadfile', file_1.upload.single('file'), file_2.default.uploadFile);
FileRouter.post('/uploadmultiple', file_1.upload.array('files', 12), file_2.default.uploadmultiple);
FileRouter.delete('/removefile/:filename', AuthenticateToken_1.authenticateToken, file_2.default.removeFile),
    FileRouter.get('/getfile/:filename', AuthenticateToken_1.authenticateToken, file_2.default.getAllFiles),
    FileRouter.get('/getfiles', AuthenticateToken_1.authenticateToken, file_2.default.getAllFiles);
exports.default = FileRouter;
