/**
 * Config for deployment to heroku
 */
const app = require('express')()

app.use(express.static('public'))

app.listen(process.env.PORT || 3000)
