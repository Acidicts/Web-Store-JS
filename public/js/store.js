// Import socket.io client library
const socket = io();

// Listen for connection event
socket.on('connect', () => {
    console.log('Connected to server');
});

// Listen for messages from the server
socket.on('alert', (data) => {
    console.log('Message from server:', data);
});

socket.on('message', (link) => {
    console.log('Message from server:', link);
    window.location.href=link;
});