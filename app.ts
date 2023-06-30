import express from 'express'
import connectDB from './server/config/mongo.config'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import path from 'path'
import cors from 'cors'
require('dotenv').config()

const app = express()

const useRoute = async (route: string) => {
  const { default: router } = await import(`./server/${route}/${route}.routes`);
  app.use(`/api/${route}`, router);
};

// App initialization
connectDB()

// Middleware
app.use(express.json({ extended: false }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'http://192.168.18.9:3000',
    ],
    credentials: true,
  })
)

// Routes Middleware
const routes = ['auth', 'references', 'foods', 'measurements', 'users']
// const routes = ['auth']
routes.forEach(route => useRoute(route))

// app.use('auth', authRouter)

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
