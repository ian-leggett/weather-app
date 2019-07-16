require('dotenv').config()
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../src/templates/views')
const partialsDir = path.join(__dirname, '../src/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ian Leggett',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must enter an address.'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ian Leggett',
    errorMessage: '404 page not found'
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})