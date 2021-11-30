const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const app = express()

const { connectMongo } = require('./src/db/connection')
const { errorHandler } = require('./src/helpers/apiHelpers')
const { postsRouter } = require('./src/routers/postsRourer')

const PORT = process.env.PORT || 8081

app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/posts', postsRouter)

app.use(errorHandler)

const start = async () => {
  try {
    connectMongo()

    app.listen(PORT, (err) => {
      if (err) {
        console.error(' Error at aserver launch: ', err)
      }
      console.log(`Server works at port ${PORT}!`)
    })
  } catch (err) {
    console.log(`Failed to launch application with error: ${err.message}`)
  }
}
start()
