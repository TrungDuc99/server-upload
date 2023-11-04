import { Request, Response } from 'express'
import { UserModel } from '../models'
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
const secretKey: any = process.env.TOKEN_SECRET_KEY

const secretKeyID: any = process.env.TOKEN_SECRET_KEY_ID_COCIAL

export default class AuthCallback {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email: email }) // find the user by email

      if (!user) {
        return res.status(401).send({ message: 'Invalid username or password' }) // return the error message when the user does not exist
      }
      // Kiểm tra password
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid username or password' })
      }
      // Tạo JWT token và trả về cho client
      const token = jwt.sign(
        {
          user: {
            uid: user._id,
            typeAccount: user.typeAccount,
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address,
          },
        },
        secretKey
        // {
        //   expiresIn: '30s', // expires in 30 days
        // }
      )
      return res.status(200).send({ token })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async loginBySocial(req: Request, res: Response) {
    try {
      const { id, data } = req.body

      const user = await UserModel.findOne({ id: id })

      if (user) {
        const token = jwt.sign(
          {
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
          },
          secretKey
        )
        return res.status(200).send({ token, newUser: false })
      } else {
        const payload = await UserModel.create({
          ...data,
          password: '',
        })
        const token = jwt.sign(
          {
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
          },
          secretKey
        )

        return res.status(200).send({ token, newUser: true, data: payload })
      }
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async register(req: Request, res: Response) {
    try {
      const { email, id, name, password, phone, address, avatarUrl } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const payload = await UserModel.create({
        email,
        name,
        id,
        typeAccount: 0,
        password: hashedPassword,
        phone,
        avatarUrl,
        address,
      })

      return res.json({ succeeded: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async registerBySocial(req: Request, res: Response) {
    try {
      const { email, id, name, birthday, avatarUrl, typeAccount } = req.body

      const payload = await UserModel.create({
        email,
        name,
        typeAccount,
        id,
        birthday,
        avatarUrl,
      })

      return res.json({ succeeded: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async logout(req: Request, res: Response) {
    try {
      const { name, description, image, id } = req.body

      const payload = await UserModel.create({
        name,
        id,
        description,
        image,
      })
      return res.json({ succeeded: true, data: payload })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  static async me(req: any, res: Response) {
    try {
      const userID = req.user.user._id // Lấy id của user.
      const id = req.user.user.id
      let payload

      if (userID) {
        payload = await UserModel.findOne({ _id: userID })
      } else if (id) {
        payload = await UserModel.findOne({ id: id })
      }

      if (!payload) {
        return res.status(404).send({ message: 'User not found' })
      }

      return res.send(payload)
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
}
const a = {
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
      avatarUrl:
        'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1312341403038732&height=200&width=200&ext=1700619795&hash=AeQ1e81UlNh0h6RQYr0',
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
}
