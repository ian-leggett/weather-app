const request = require('request')
const config = require('../../config')

const forecast = (latitude, longitude, callback) => {
  const url = `${config.darksky.url}forecast/${config.darksky.apikey}/${latitude},${longitude}?units=si`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high is ${body.daily.data[0].temperatureHigh}, the low is ${body.daily.data[0].temperatureLow}`)
    }
  })
}

module.exports = forecast