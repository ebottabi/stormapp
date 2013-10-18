var app = require('express').createServer()
  , io = require('socket.io').listen(app)
  , redis = require('redis');
var sub = redis.createClient();
sub.subscribe("tags");
//sub.subscribe("links");
//sub.subscribe("market");
//sub.subscribe("retweets");
//sub.subscribe("articles");

app.listen(5454);


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/app2.html');
});


app.get('/readme.html', function (req, res) {
  res.sendfile(__dirname + '/readme.html');
});

app.get('/socket.io/socket.io.js', function (req, res) {
	res.sendfile(__dirname + '/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js');
	}); 

sub.on("message", function(channel, message){
	console.log(" recvfrom channel : %s, the message : %s", channel, message);
    });

io.sockets.on("connection", function (socket) {
  sub.on("message", function(pattern, key){
    console.log("client channel recieve from channel : %s, the message : %s", channel, message);
    socket.emit(pattern, key);
  });

});
