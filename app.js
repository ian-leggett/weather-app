require('dotenv').config()
const request = require('request')
const config = require('./config')

const url = config.apiUrl

request({ url: `${url}forecast/${process.env.APIKEY}/37.8267,-122.4233` }, (error, response) => {
  try {
    const data = JSON.parse(response.body)
    console.log(data.currently)
  } catch (e) {
    console.log(`Could not fetch the weather information :-( : ${e}`)
  }
})