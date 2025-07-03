const mongoose = require('mongoose')
require('dotenv').config()

const { DB_USER, DB_PASSWORD, DB_DBNAME } = process.env

const mongoURI = `mongodb+srv://tguzmani:${DB_PASSWORD}@tguzmani.gbmzw.mongodb.net/?retryWrites=true&w=majority&appName=TGuzmani`

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      dbName: DB_DBNAME,
    })
    console.log('MongoDB Connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = connectDB
