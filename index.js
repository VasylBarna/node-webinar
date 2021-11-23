const express = require('express')
const morgan = require('morgan')
const got = require('got')
const cors = require('cors')

require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 8081
const baseUrl = 'http://api.weatherbit.io/v2.0/current'
const apiKey = process.env.WEATHER_API_KEY

app.use(morgan('tiny'))
app.use(cors())

app.get('/api/weather', async (req, res) => {
  try {
    const { latitude, longitude } = req.query
    if (!latitude) {
      return res
        .status(400)
        .json({ message: 'latitude parameter is mandatory' })
    }
    if (!longitude) {
      return res
        .status(400)
        .json({ message: 'longitude parameter is mandatory' })
    }
    const response = await got(baseUrl, {
      searchParams: {
        key: apiKey,
        lat: latitude,
        lon: longitude,
      },
      responseType: 'json',
    })
    const [weatherData] = response.body.data
    const {
      city_name,
      weather: { description },
      temp,
    } = weatherData
    res.json({ city_name, description, temp })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.listen(PORT, (err) => {
  if (err) {
    console.error(' Error at aserver launch: ', err)
  }
  console.log(`Server works at port ${PORT}!`)
})
