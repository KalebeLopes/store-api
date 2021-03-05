import mongoose from 'mongoose'

const mondodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/test'

const connect = () => mongoose.connect(mondodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export default {
  connect,
  connection: mongoose.connection
}