import { Router } from 'express'

import { upload } from '../middleware/file'
import { authenticateToken } from '../middleware/AuthenticateToken'
import FileCallback from '../controller/file'

const FileRouter = Router()

FileRouter.post(
  '/uploadfile',

  upload.single('file'),
  FileCallback.uploadFile
)
FileRouter.post(
  '/uploadmultiple',
  upload.array('files', 12),
  FileCallback.uploadmultiple
)
FileRouter.delete(
  '/removefile/:filename',
  authenticateToken,
  FileCallback.removeFile
),
  FileRouter.get('/getfile/:filename', authenticateToken, FileCallback.getAllFiles),
  FileRouter.get('/getfiles', authenticateToken, FileCallback.getAllFiles)
export default FileRouter
