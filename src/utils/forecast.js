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
      const data = body.currently
      const { temperature, precipProbability } = data
      callback(undefined, `It is currently ${temperature} degrees out. There is ${precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast