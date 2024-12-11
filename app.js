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


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (data) => {
        console.log('Request:', data);
        if (data === "flexy") {
          const amountInGDP = 1.5;
        }
        else {
          const amountInGDP = 2;
        }
        fetch('https://api.exchangerate-api.com/v4/latest/GBP')
                  .then(response => response.json())
                  .then(data => {
                      const exchangeRate = data.rates.USD;
                      const amountInUSD = (amountInGDP * exchangeRate).toFixed(2);
                      const url = `https://hcb.hackclub.com/donations/start/bccs-hack-club?message=This+is+£${amountInGDP.toFixed(2)}+in+Dollars+Fill+in+The+Email+and+The+Name&goods=true&amount=${(amountInUSD * 100)}`;
                      socket.emit('message', url);
                  })
                  .catch(error => console.error('Error fetching exchange rate:', error));
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})