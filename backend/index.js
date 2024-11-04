import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// utils
import connectDB from './config/db.js'

// routes
import userRoutes from './routes/userRoutes.js'

dotenv.config()

// port
const PORT = process.env.PORT || 5000

// connect to db
connectDB()

// express
const app = express()

// Middleware to allow all origins

app.use(cors({credentials: true, origin: 'http://localhost:5173'}))

// Middleware to parse JSON bodies
app.use(express.json())
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }))
// Middleware to parse cookies
app.use(cookieParser())

// API routes
app.use('/api/users', userRoutes)

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
