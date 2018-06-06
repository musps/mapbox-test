const express = require('express')
const app = express()

app.use('/', express.static(__dirname + '/www'))

app.listen(3000, function () {
  console.log('www listening on port 3000')
})
