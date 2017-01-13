var app = require('./app');
var http = require('http');

console.log("starting...");

var port = 3000;

app.set('port', port);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(port);
server.on('listening', listening);

var messages = [];

io.sockets.on('connection', function(socket) {
    socket.emit('messages', messages);
    socket.broadcast.emit('alert', 'New client connected!');

    socket.on('message', function(message) {
        messages.push(["Username", message]);
        socket.emit('messages', messages);
        socket.broadcast.emit('messages', messages);
    });

    socket.on('disconnect', function() {
        socket.broadcast.emit('alert', 'Client disconnected!');
    });
});

function listening() {
    console.log("server started on port number " + server.address().port);
    console.log("listening...");
}
