var express=require('express');
var http=require('http');
var app=express();
var server=http.createServer(app);
var socket=require('socket.io').listen(server);

app.use(express.static(__dirname+'/Test'));

server.listen(8080);

console.log('server Started at port 8080');

socket.sockets.on('connection', function(socket){
	console.log('user connected');
	socket.on('set nickname',function(nickname){
		socket.nickname=nickname;
		console.log('Currently'+nickname+' connected');
	});
});



/* var io = require('socket.io').listen(8080);
io.on('Name'
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
}); */