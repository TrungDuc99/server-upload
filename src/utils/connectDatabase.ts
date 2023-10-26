import mongoose from 'mongoose'
require('dotenv').config()

const connectDatabase = () => {
  mongoose.Promise = require('bluebird')
  const urlConnection = `mongodb+srv://${process.env.DB_USERNAME}:${
    process.env.DB_PASSWORD
  }@${process.env.DB_URLDEV || process.env.DB_URL}/${process.env.DB_NAME}`

  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
        process.env.DB_URLDEV || process.env.DB_URL
      }/${process.env.DB_NAME}`
    )
    .then(() => {
      console.log('Database connection created')
    })
    .catch((err) => {
      console.log('Error:/n', err)
    })
}

export default connectDatabase
