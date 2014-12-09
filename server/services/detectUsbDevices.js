"use strict";
var usb = require('node-hid');

var findByVendorIdAndProductId = function(vendorId, productId) {
    var device = null;

    console.log("Scanning for device...");
    console.log(usb.devices().length + " HID devices found");

    for(var i in usb.devices()) {
        var d = usb.devices()[i];
        console.log("Device " + (i+1) + ": " + d.vendorId);
        if(d.vendorId == vendorId && d.productId == productId) {
            device = d;
            break;
        }
    }

    return device;
};

exports.findByVendorIdAndProductId = findByVendorIdAndProductId;