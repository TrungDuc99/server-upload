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
var debug = require('debug')('server-upload:server');
var fs = require('fs');
require('dotenv').config();
var PORT = parseInt(process.env.PORT, 10) || 9888;
var URL = parseInt(process.env.URL, 10) || 9888;
var baseUrl = "http://localhost:".concat(PORT, "/ftp/uploads/");
var removeFileUrl = "http://localhost:".concat(PORT, "/api/removefile/");
var baseUrlProduction = "".concat(URL, "/ftp/uploads/");
var removeFileUrlProduction = "".concat(URL, "/api/removefile/");
var FileCallback = /** @class */ (function () {
    function FileCallback() {
    }
    FileCallback.getAllFiles = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var directoryPath;
            return __generator(this, function (_a) {
                try {
                    directoryPath = process.cwd() + '/public/uploads/';
                    fs.readdir(directoryPath, function (err, files) {
                        if (err) {
                            res.status(500).send({
                                message: 'Unable to scan files!',
                            });
                        }
                        var fileInfos = [];
                        files.forEach(function (file) {
                            fileInfos.push({
                                url: "".concat(baseUrl).concat(file),
                                //    url: `${baseUrlProduction}${req.file.filename}`,
                                removeFileUrl: "".concat(removeFileUrl).concat(file),
                                //   removeFileUrl: `${removeFileUrlProduction}${req.file.filename}`,
                            });
                        });
                        res.status(200).send(fileInfos);
                    });
                }
                catch (err) {
                    res.status(500).json({ error: err });
                }
                return [2 /*return*/];
            });
        });
    };
    FileCallback.uploadFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    debug(req.file);
                    return [2 /*return*/, res.send(__assign(__assign({}, req.file), { url: "".concat(baseUrl).concat(req.file.filename), 
                            //    url: `${baseUrlProduction}${req.file.filename}`,
                            removeFileUrl: "".concat(removeFileUrl).concat(req.file.filename) }))];
                }
                catch (err) {
                    res.status(500).json({ error: err });
                }
                return [2 /*return*/];
            });
        });
    };
    FileCallback.uploadmultiple = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var files, newFiles;
            return __generator(this, function (_a) {
                try {
                    debug(req.files);
                    files = req.files;
                    newFiles = files.map(function (file) {
                        return __assign(__assign({}, file), { url: "".concat(baseUrl).concat(req.file.filename), 
                            //    url: `${baseUrlProduction}${req.file.filename}`,
                            removeFileUrl: "".concat(removeFileUrl).concat(req.file.filename) });
                    });
                    if (!files) {
                        res.status(400).json({ error: 'Please choose files' });
                    }
                    res.send(newFiles);
                }
                catch (err) {
                    res.status(500).json({ error: err });
                }
                return [2 /*return*/];
            });
        });
    };
    FileCallback.removeFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, directoryPath;
            return __generator(this, function (_a) {
                fileName = req.params.filename;
                directoryPath = process.cwd() + '/public/uploads/';
                fs.unlink(directoryPath + fileName, function (err) {
                    if (err) {
                        res.status(500).send({
                            message: 'Could not delete the file. ' + err,
                        });
                    }
                    res.status(200).send({
                        message: 'File is deleted.',
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    return FileCallback;
}());
exports.default = FileCallback;
