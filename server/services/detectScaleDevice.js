"use strict";
var usb = require("./detectUsbDevices");

var scaleDevice = usb.findByVendorIdAndProductId("2338", "32772");

if(scaleDevice == null) {
    throw("No scale found!");
}

console.log("Creating device...");
scaleDevice = new usb.HID(scaleDevice.path);
console.log("Scale Device Found: " + JSON.stringify(scaleDevice));

module.exports = scaleDevice;