import { Document, Schema } from 'mongoose'
import defaultType from '../utils/defaultType'

require('dotenv').config()

export interface UserDoc extends Document {
  id: string
  email: string
  name: string
  password: string
  birthday: string
  avatarUrl: string
  typeAccount: number
  gender: string
  isAdmin: boolean
  phone: string
  address: string
  created: Date
  updated: Date
}

const UserSchema = new Schema<UserDoc>({
  email: defaultType.email,
  typeAccount: defaultType.number,
  isAdmin: defaultType.boolean,
  gender: defaultType.string,
  id: defaultType.string,
  name: defaultType.string,
  avatarUrl: defaultType.string,
  password: defaultType.string,
  phone: defaultType.string,
  address: defaultType.string,
  created: defaultType.date_now,
  updated: defaultType.date,
  birthday: defaultType.string,
})

export default UserSchema
