import express from 'express'

import cors from 'cors'
var path = require('path')
import jwt from 'jsonwebtoken'
import morgan from 'morgan'
import FileRouter from './routes/file'
import { AuthRouter } from './routes'
import connectDatabase from './utils/connectDatabase'
const serveIndex = require('serve-index')
const bodyParser = require('body-parser')
const debug = require('debug')('backend:server')
var http = require('http')
require('dotenv').config()
// const redis = require('redis')

const PORT = parseInt(<string>process.env.PORT, 10) || 9888
const secretKey: any = process.env.TOKEN_SECRET_KEY

const app = express()
connectDatabase()
app.set('view engine', 'jade')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use('/ftp', (req, res, next) => {
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
  app.use(express.static(path.join(process.cwd())))
  res.sendFile(process.cwd() + '/login.html')
})

app.get('/upload', function (req, res) {
  app.use(express.static(path.join(process.cwd())))
  res.sendFile(process.cwd() + '/upload.html')
})

// routes api
app.use('/api', FileRouter)
app.use('/api', AuthRouter)
app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`)
  debug('Server is up and running on port ', PORT)
})
