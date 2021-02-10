const express = require('express')
const connectDB = require('./database')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const useRoute = route => {
  app.use(`/api/${route}`, require(`./routes/${route}Routes`))
}

// App initialization
const app = express()
connectDB()

// Middleware
app.use(express.json({ extended: false }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())

// Routes Middleware
routes = ['auth', 'food', 'measure', 'reference', 'user', 'recipe']
routes.forEach(route => useRoute(route))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

// Listen
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
