// dependencies
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// array of users
var users = new Array();

io.on('connection', function(socket) {
	console.log('New User Connected...');
	
	// disconnected user
	socket.on('disconnect', function() {
		console.log('User Disconnected!');
		
		// send data about disconnected user
		io.emit('disconnect', users[socket.id]);
	});
	
	// a new user connected
	socket.on('usersConnect', function(data) {
		console.log('Data added to new connected user!');
	
		// save data about connected user
		if (data !== undefined) {
			users[socket.id] = data;
		}
	});
	
	// received a help request
	socket.on('rescueThis', function(data) {
		console.log('Rescue Data: ' + data);
		
		io.emit('rescueThis', data);
	});
	
	// received a rescue respond
	socket.on('rescueOnWay', function(data) {
		console.log('Rescue Respond Data: ' + data);
		
		io.emit('rescueOnWay', data);
	});
	
	// received active rescuer
	socket.on('Rescuer', function(data) {
		console.log('Active rescuer data: ' + data);
		
		io.emit('Rescuer', data);
	});
});

http.listen(4000, "54.161.220.180", function() {
	console.log('Listening on: *:4000');
});