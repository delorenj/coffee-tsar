"use strict";
var path = require("path");

var config = {
    port: 80,
    paths: {
        webroot: path.join(__dirname, '../public'),
        project: path.join(__dirname, '../'),
        server: path.join(__dirname, '../server')
    },
    devices: {
        scale: {
            vendorId: '2338',
            productId: '32772'
        }
    }
};

module.exports = config;