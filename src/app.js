require('dotenv').config()
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

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

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ian Leggett',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ian Leggett',
    message: 'This is the help section, how can I help',
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ian Leggett',
    errorMessage: 'Help article cannot be found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ian Leggett',
    errorMessage: '404 page not found'
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})