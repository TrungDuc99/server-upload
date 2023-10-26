import { Response } from 'express'
const debug = require('debug')('server-upload:server')
const fs = require('fs')
require('dotenv').config()
const PORT = parseInt(<string>process.env.PORT, 10) || 9888
const URL = parseInt(<string>process.env.URL, 10) || 9888

const baseUrl = `http://localhost:${PORT}/ftp/uploads/`
const removeFileUrl = `http://localhost:${PORT}/api/removefile/`
const baseUrlProduction = `${URL}/ftp/uploads/`
const removeFileUrlProduction = `${URL}/api/removefile/`
interface FileI {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
  url: string
  removeFileUrl: string
}

export default class FileCallback {
  static async getAllFiles(req: any, res: Response) {
    try {
      const directoryPath = process.cwd() + '/public/uploads/'

      fs.readdir(directoryPath, function (err: any, files: any) {
        if (err) {
          res.status(500).send({
            message: 'Unable to scan files!',
          })
        }
        let fileInfos: any[] = []

        files.forEach((file: FileI) => {
          fileInfos.push({
            // url: `${baseUrl}${file}`,
            url: `${baseUrlProduction}${file}`,
            // removeFileUrl: `${removeFileUrl}${file}`,
            removeFileUrl: `${removeFileUrlProduction}${file}`,
          })
        })

        res.status(200).send(fileInfos)
      })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async uploadFile(req: any, res: Response) {
    try {
      debug(req.file)

      return res.send({
        ...req.file,
        // url: `${baseUrl}${req.file.filename}`,
        url: `${baseUrlProduction}${req.file.filename}`,
        // removeFileUrl: `${removeFileUrl}${req.file.filename}`,
        removeFileUrl: `${removeFileUrlProduction}${req.file.filename}`,
      })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async uploadmultiple(req: any, res: Response) {
    try {
      debug(req.files)
      const files = req.files
      let newFiles = files.map((file: any) => {
        return {
          ...file,
          // url: `${baseUrl}${req.file.filename}`,
          url: `${baseUrlProduction}${req.file.filename}`,
          // removeFileUrl: `${removeFileUrl}${req.file.filename}`,
          removeFileUrl: `${removeFileUrlProduction}${req.file.filename}`,
        }
      })
      if (!files) {
        res.status(400).json({ error: 'Please choose files' })
      }
      res.send(newFiles)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async removeFile(req: any, res: Response) {
    const fileName = req.params.filename
    const directoryPath = process.cwd() + '/public/uploads/'
    fs.unlink(directoryPath + fileName, (err: any) => {
      if (err) {
        res.status(500).send({
          message: 'Could not delete the file. ' + err,
        })
      }

      res.status(200).send({
        message: 'File is deleted.',
      })
    })
  }
}
