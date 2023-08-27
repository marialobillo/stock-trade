import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectionDB'


const PORT = process.env.PORT || 3030
const app = express()


// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const start = async () => {
    try {
        const mongoDBConnection = await connectDB()
        app.listen(PORT, () => {
            console.log(`*** Server is running on port ${PORT} ***`)
        })
    } catch (error) {
        console.log("/// Error during connection: ", error)
    }
}


start()
