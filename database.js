const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_USER}-gbmzw.mongodb.net/food?retryWrites=true&w=majority`

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
