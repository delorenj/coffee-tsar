#!/usr/bin/env node
"use strict";

var debug = require("debug")("splash-coffee-tsar");
var express = require("./app");
var app = express.app;
var http = express.http;

app.set("port", 80);

var server = http.listen(app.get("port"), function() {
    debug("Express server listening on port " + server.address().port);
});