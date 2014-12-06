var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usb = require('usb');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var scaleDevice = usb.findByIds(0x0922, 0x8004);
console.log("Scale Device: " + JSON.stringify(scaleDevice));

scaleDevice.open();
var iface = scaleDevice.interface(0);
iface.claim();
var inEndpoint = iface.endpoints[0];
inEndpoint.transfer(64, function(data, size) {
	console.log("transfer: " + size);
});

io.on('connection', function(socket){
	socket.on('measurement', function(data) {
		io.emit('measurement', data);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
