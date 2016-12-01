'use strict'

let fs = require('fs')
let path = require('path')
let express = require('express')
let bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://trello.com')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/*', function (req, res) {
  let potentialFile = path.join(__dirname, '../public', req.path)
  try {
    fs.accessSync(potentialFile, fs.F_OK)
    if (fs.lstatSync(potentialFile).isDirectory()) {
      res.sendFile(path.join(__dirname, '../public', 'index.html'))
    } else {
      res.sendFile(potentialFile)
    }
  } catch (e) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
  }
})

let port = process.env.PORT || 8000
let server = app.listen(port, function () {
  let host = (server.address().address === '::') ? 'localhost' : server.address().address
  let port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})
