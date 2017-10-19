"use strict";

const sockets = [];

module.exports = function(io) {

    io.on('connection', function(socket) {

        socket.emit('add-users', {
            users: sockets
        });

        socket.broadcast.emit('add-users', {
            users: [socket.id]
        });

        socket.on('make-offer', function(data) {
            socket.to(data.to).emit('offer-made', {
                offer: data.offer,
                socket: socket.id
            });
        });

        socket.on('make-answer', function(data) {
            socket.to(data.to).emit('answer-made', {
                socket: socket.id,
                answer: data.answer
            });
        });

        socket.on('disconnect', function() {
            sockets.splice(sockets.indexOf(socket.id), 1);
            io.emit('remove-user', socket.id);
        });

        sockets.push(socket.id);
    });
};