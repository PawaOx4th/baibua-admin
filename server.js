var express = require("express");
// eslint-disable-next-line no-unused-vars
var path = require("path");
var serveStatic = require("serve-static");
// eslint-disable-next-line no-undef
app = express();
// eslint-disable-next-line no-undef
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
// eslint-disable-next-line no-undef
app.listen(port);
console.log("server started " + port);
