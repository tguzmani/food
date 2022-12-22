const express = require('express')
const connectDB = require('./server/config/mongo.config')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const useOldRoute = route => {
  app.use(`/api/${route}`, require(`./server/routes/${route}Routes`))
}

const useRoute = route => {
  app.use(`/api/${route}`, require(`./server/${route}/${route}.routes`))
}

// App initialization
const app = express()
connectDB()

// Middleware
app.use(express.json({ extended: false }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())

// Old Routes Middleware
// oldRoutes = ['measure', 'users', 'recipe']
oldRoutes = ['measure', 'users']
oldRoutes.forEach(route => useOldRoute(route))

// Routes Middleware
routes = ['auth', 'references', 'foods', 'measurements']
routes.forEach(route => useRoute(route))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
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
