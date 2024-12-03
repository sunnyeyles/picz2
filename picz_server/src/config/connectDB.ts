import mongoose from 'mongoose'

type MongoDbUri = string

export const connectMongo = async () => {
  try {
    const dbURI: MongoDbUri = process.env.DB_CONNECTION_STRING || ''

    if (!dbURI) {
      throw new Error('MongoDB URI is not set in the environment variables')
    }

    await mongoose.connect(dbURI)

    console.log('mongo connection successful')
  } catch (error) {
    console.error('error connecting to the database:', error)
    throw new Error('error connecting to db')
  }
}
