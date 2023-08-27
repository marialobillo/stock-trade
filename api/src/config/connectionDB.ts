import 'dotenv/config'
import mongoose from 'mongoose'

const MONGO_URI = <string>process.env.MONGO_URI || ''

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`*** Connected to MongoDB: ${MONGO_URI} ***`)
    } catch (error) {
        console.log('/// Error during connection to MongoDB: ', error)
    }
}

export default connectDB

