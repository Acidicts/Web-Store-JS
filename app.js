const express = require('express');
const app = express();
const port = process.env.PORT || 5500; // Use environment variable for port

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (data) => {
    let amountInGDP = 1.75;
    console.log('Request:', data);
    if (data === "flexy") {
      amountInGDP = 1.5; 
    } else {
      amountInGDP = 2;
    }
    fetch('https://api.exchangerate-api.com/v4/latest/GBP')
      .then(response => response.json())
      .then(data => {
        console.log('Exchange rate data:', data);
      });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});