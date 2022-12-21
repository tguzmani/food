const mongoose = require('mongoose')
require('dotenv').config()

const { DB_USER, DB_PASSWORD, DB_DBNAME } = process.env

const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_USER}-gbmzw.mongodb.net/${DB_DBNAME}?retryWrites=true&w=majority`


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log('MongoDB Connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = connectDB
