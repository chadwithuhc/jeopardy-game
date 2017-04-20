/**
 * Config for deployment to heroku
 */
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/dist'))

app.listen(process.env.PORT || 3000)
