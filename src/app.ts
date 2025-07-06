// src/app.ts
import express from 'express'
import authRoutes from './routes/authRote'
import privateRoutes from './routes/privateRoutes'
import paymentsRoutes from './routes/paymentsRoutes'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/api', privateRoutes)
app.use('/payment', paymentsRoutes)

export default app
