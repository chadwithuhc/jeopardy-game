/**
 * Config for deployment to heroku
 */
const app = require('express')()

app.use(express.static('dist'))

app.listen(process.env.PORT || 3000)
