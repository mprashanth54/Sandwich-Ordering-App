#!/usr/bin/env node

var debug = require('debug')('passport-mongo');
var app = require('./app');

var socketio = require('socket.io');
app.set('port', process.env.PORT || 3000);


var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

var data ="Change in data";
var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {

  socket.emit('broadcast', data);

  socket.on('broadcast', function(obj) {
    console.log(obj);
    data = obj;
    socket.broadcast.emit('broadcast', data);
  });
});
