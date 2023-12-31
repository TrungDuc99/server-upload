import multer from 'multer'

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    // cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    cb(null, req.body.title)
  },
})
export const upload = multer({ storage: storage })
