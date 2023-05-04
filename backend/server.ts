import express, {Express, NextFunction, Request, Response} from 'express'
import workoutRouter from './routes/workout'
import userRouter from './routes/user'
import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'

const app: Express = express();
const PORT = 8082;

app.use(express.json())
app.use(cors())

// middleware
app.use('/api/workouts', workoutRouter)
app.use('/api/user', userRouter)

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`helloworld, listening on port ${PORT}`)
        })
    }).catch(err => console.log('@@err', err))