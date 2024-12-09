const express = require('express')
const app = express()
const port = 5500

const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server, { pingInterval : 2000, pingTimeout : 5000 })

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
