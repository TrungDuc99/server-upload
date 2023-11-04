import mongoose from 'mongoose'
import UserSchema, { UserDoc } from './User'

const UserModel = mongoose.model<UserDoc>('User', UserSchema)
UserModel.collection.createIndex({ name: 'text', email: 'text' })

export { UserModel }
