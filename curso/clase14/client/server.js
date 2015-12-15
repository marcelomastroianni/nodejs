var express = require("express");

var app = express();

app.use(express.static(__dirname));//Se toma como directorio de archivos staticos el mismo directorio donde se corre la aplicacion

app.listen(3001);