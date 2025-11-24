import express from 'express'
import cors from 'cors'
import { findAllUsers } from './controllers'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/users', findAllUsers);

export default app