var express = require('express'),
	app = express(),
server = require('http').Server(app);
var io = require('socket.io')(server),
socketStream =require('socket.io-stream'),
fs = require('fs');
var path = require('path');
var port = process.env.PORT||8082;
app.use(express.static(__dirname));

var server1 =server.listen(port,function(){
    console.log("server Listening on port "+port );
});
// app.listen(port,function(){
//     console.log('starting on  : '+ port);
// });

io.on('connection', function(socket) {
	console.log("Connected");
  socketStream(socket).on('fileUpload', function(stream, data) {
    var filename = path.basename(data.name);
    console.log(data);
    // console.log(stream);
    stream.pipe(fs.createWriteStream("Uploads/"+filename));
  });
});
