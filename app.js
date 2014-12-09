var express = require('express');
var app = express();
var http = require("http").createServer(app);
var io = require('socket.io')(http);
var path = require("path");

app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

// var scaleDevice = usb.findByIds(0x0922, 0x8004);
// var scaleDevice = new HID.HID()

var scaleDevice = require("./server/services/detectScaleDevice");

scaleDevice.on("data", function(data) {
	console.log(JSON.stringify(data));
	var result = {
		weight: data[4] + (255*data[5]),
		on: data[1] == 4 ? 1 : 0
	}
	io.emit('measurement', result);
});

io.on('connection', function(socket){
	console.log("Connected!");
	socket.on('measurement', function(data) {
		io.emit('measurement', data);
	});
});

exports.http = http;
exports.app = app;