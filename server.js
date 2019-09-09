var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 8081



app.use(express.static(__dirname + '/src'));

console.log(__dirname)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});



server.listen(port, function () {
  console.log(`Listening on ${server.address().port}`);
});