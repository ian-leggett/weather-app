module.exports = {
  darksky: {
    url: 'https://api.darksky.net/',
    apikey: process.env.DARKSKY_APIKEY
  },
  mapBox: {
    url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    apikey: process.env.MAPBOX_APIKEY,
  }
}