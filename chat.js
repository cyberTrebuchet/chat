  /////////////////////////////////////////////////
 //  Thompson's Chat Program In Progress! v0.1  //
/////////////////////////////////////////////////
//
// a forum of messages
//
// for the people
//
//

var fs = require("fs");
var net = require("net");
var port = 2000;
var chalk = require("chalk");

var server = net.createServer(function(client){

  console.log(client + " connected!");

  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);



  client.on("end", function(){
    console.log("Someone disconnected. I wonder why...");
  });

  client.setEncoding("utf8");

  client.write("Welcome to Thompson's Chat Program In Progress!\n");
  client.write("Say any old thing you want!\n");

  client.on("data", function(data){

  });
});

server.listen(port, function(){
  console.log("Server up and running. Listening on port " + port + ".");
});

