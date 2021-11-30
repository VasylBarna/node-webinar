const mongoose = require('mongoose')

const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URL).catch((err) => console.log(err))
}

module.exports = { connectMongo }
