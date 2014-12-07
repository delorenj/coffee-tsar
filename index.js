var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usb = require('node-hid');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// var scaleDevice = usb.findByIds(0x0922, 0x8004);
// var scaleDevice = new HID.HID()

var scaleDevice = null;

console.log("Scanning for device...");
console.log(usb.devices().length + " HID devices found");

for(i in usb.devices()) {
	var d = usb.devices()[i];
	console.log("Device " + (i+1) + ": " + d.vendorId);
	if(d.vendorId == "2338" && d.productId =="32772") {
		scaleDevice = d;
		break;
	}
}

if(scaleDevice == null) {
	throw("No scale found!");
}

console.log("Creating device...");

scaleDevice = new usb.HID(scaleDevice.path);

console.log("Scale Device Found: " + JSON.stringify(scaleDevice));

scaleDevice.on("data", function(data) {
	console.log(JSON.stringify(data));
	var result = {
		weight: data[4] + (255*data[5]),
		on: data[1] == 4 ? 1 : 0
	}
	io.emit('measurement', result);
});

io.on('connection', function(socket){
	socket.on('measurement', function(data) {
		io.emit('measurement', data);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
