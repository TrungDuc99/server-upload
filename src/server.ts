import express from 'express'

import cors from 'cors'

import jwt from 'jsonwebtoken'
import morgan from 'morgan'
import FileRouter from './routes/file'
const serveIndex = require('serve-index')
const bodyParser = require('body-parser')
const debug = require('debug')('backend:server')
require('dotenv').config()
// const redis = require('redis')

const PORT = parseInt(<string>process.env.PORT, 10) || 9888
const secretKey: any = process.env.TOKEN_SECRET_KEY

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use('/ftp', (req, res, next) => {
  console.log(req.headers)

  if (req.url === '/' || req.url === '/uploads/') {
    const authHeader = req.headers.authorization
    const token: any = authHeader && authHeader.split(' ')[1]

    const decodedToken = jwt.verify(token, secretKey) as any
    if (decodedToken.user.isAdmin) {
      app.use(
        '/ftp',
        express.static('public'),
        serveIndex('public', { icons: true })
      )
      next()
    } else {
      res.status(403).send({
        message: 'Access Forbidden',
      })
    }
  } else {
    app.use('/ftp', express.static('public'), serveIndex('public', { icons: true }))
    next()
  }
})

app.get('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(
    '<form action="/api/uploadfile" method="post" enctype="multipart/form-data">'
  )
  res.write('<input type="file" name="file"><br>')
  res.write('<input type="submit">')
  res.write('</form>')
  res.write(
    '<form action="/api/uploadmultiple" method="post" enctype="multipart/form-data">'
  )
  res.write('<input type="file" name="files" multiple><br>')
  res.write('<input type="submit">')
  res.write('</form>')
  return res.end()
})
// routes api
app.use('/api', FileRouter)
app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`)
  debug('Server is up and running on port ', PORT)
})

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
