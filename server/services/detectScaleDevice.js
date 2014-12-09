"use strict";
var detect = require("./detectUsbDevices");
var usb = require('node-hid');
var config = require("config");

var scaleDevice = detect.findByVendorIdAndProductId(config.get("devices.scale.vendorId"), config.get("devices.scale.productId"));

if(scaleDevice == null) {
    throw("No scale found!");
}

console.log("Creating device...");
scaleDevice = new usb.HID(scaleDevice.path);
console.log("Scale Device Found: " + JSON.stringify(scaleDevice));

module.exports = scaleDevice;