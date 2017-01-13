var socket = io.connect('http://localhost:3000');

var message = $('#message');
var chat = $('#messages');

function sendMessage() {
    if (message.val()) {
        socket.emit('message', message.val());
        message.val("");
    }
}

$('#send').on('click', function() {
    sendMessage();
});

message.on('keypress', function(e) {
    if (e.which === 13) {
        sendMessage();
    }
});

socket.on('messages', function(messages) {
    chat.html('');

    for (var i = 0; i < messages.length; i++) {
        chat.append('<li class="collection-item avatar"><i class="material-icons circle blue">perm_identity</i><span class="title">' + messages[i][0] + '</span><p>' + messages[i][1] + '</p></li>')
    }

    chat.animate({
        scrollTop: chat.prop("scrollHeight")
    }, 1000);
});

socket.on('alert', function(message) {

    chat.append('<li class="collection-item"><p>' + message + '</p></li>')

    chat.animate({
        scrollTop: chat.prop("scrollHeight")
    }, 1000);
});
