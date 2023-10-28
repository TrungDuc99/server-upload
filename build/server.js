"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path = require('path');
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var morgan_1 = __importDefault(require("morgan"));
var file_1 = __importDefault(require("./routes/file"));
var serveIndex = require('serve-index');
var bodyParser = require('body-parser');
var debug = require('debug')('backend:server');
var http = require('http');
require('dotenv').config();
// const redis = require('redis')
var PORT = parseInt(process.env.PORT, 10) || 9888;
var secretKey = process.env.TOKEN_SECRET_KEY;
var app = (0, express_1.default)();
app.set('view engine', 'jade');
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/ftp', function (req, res, next) {
    if (req.url === '/' || req.url === '/uploads/') {
        var authHeader = req.headers.authorization;
        var token = authHeader && authHeader.split(' ')[1];
        var decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        if (decodedToken.user.isAdmin) {
            app.use('/ftp', express_1.default.static(process.cwd() + 'public'), serveIndex('public', { icons: true }));
            next();
        }
        else {
            res.status(403).send({
                message: 'Access Forbidden',
            });
        }
    }
    else {
        app.use('/ftp', express_1.default.static(process.cwd() + 'public'), serveIndex('public', { icons: true }));
        next();
    }
});
// app.get('/', function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/html' })
//   res.write(
//     '<form action="/api/uploadfile" method="post" enctype="multipart/form-data">'
//   )
//   res.write('<input type="file" name="file"><br>')
//   res.write('<input type="submit">')
//   res.write('</form>')
//   res.write(
//     '<form action="/api/uploadmultiple" method="post" enctype="multipart/form-data">'
//   )
//   res.write('<input type="file" name="files" multiple><br>')
//   res.write('<input type="submit">')
//   res.write('</form>')
//   return res.end()
// })
app.get('/login', function (req, res) {
    app.use(express_1.default.static(path.join(process.cwd())));
    res.sendFile(process.cwd() + '/login.html');
});
app.get('/hupload', function (req, res) {
    app.use(express_1.default.static(path.join(process.cwd())));
    res.sendFile(process.cwd() + '/login.html');
});
// routes api
app.use('/api', file_1.default);
app.listen(PORT, function () {
    console.log("Server is running at port: http://localhost:".concat(PORT));
    debug('Server is up and running on port ', PORT);
});
// const express = require("express");
// const app = express();
// const debug = require("debug")("myapp:server");
// const path = require("path");
// const multer = require("multer");
// const logger = require("morgan");
// const serveIndex = require("serve-index");
// require("dotenv").config();
// const port = process.env.PORT || 3000;
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// //will be using this for uplading
// const upload = multer({ storage: storage });
// //get the router
// const userRouter = require("./routes/user.route");
// app.use(logger("tiny"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));
// app.use(
//   "/ftp",
//   express.static("public"),
//   serveIndex("public", { icons: true })
// );
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
// app.post("/uploadfile", upload.single("file"), function (req, res) {
//   debug(req.file);
//   return res.send({
//     ...req.file,
//     url: `http://localhost:${port}/ftp/uploads/${req.file.filename}`,
//   });
// });
// app.post("/uploadmultiple", upload.array("files", 12), (req, res, next) => {
//   debug(req.files);
//   const files = req.files;
//   let newFiles = files.map((file) => {
//     return {
//       ...file,
//       url: `http://localhost:${port}/ftp/uploads/${file.filename}`,
//     };
//   });
//   if (!files) {
//     const error = new Error("Please choose files");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(newFiles);
// });
// //if end point is /users/, use the router.
// app.use("/users", userRouter);
// app.listen(port, () => {
//   debug("Server is up and running on port ", port);
//   console.log(`Server is running at port http://localhost:${port}`);
// });
