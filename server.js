#!/usr/bin/env node
"use strict";

var config = require("config");
var express = require("./app");
var app = express.app, http = express.http;

app.set("port", config.get("port"));

var server = http.listen(app.get("port"), function() {
    console.log("Express server listening on port " + server.address().port);
});