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

var clients = [];

// Thanks to Steven Edelmann for function broadcast()
var broadcast = function broadcast(message, sender) {
  clients.forEach(function (client) {
    if (client != sender) {
      client.write(message); 
    }
  });
  console.log(message.toString());
}

var server = net.createServer(function(client){

  client.setEncoding("utf8");

  client.name = client.remoteAddress + ": " + client.remotePort; 
  clients.push(client); 

  client.write("Welcome to Thompson's Chat Program In Progress!\n");
  client.write("Say any old thing you want!\n");
  client.write("Your unique visitor stamp is " + client.name + "\n");

  broadcast(client.name + " joined the chat\n", client);
  console.log(client.name + " joined the chat\n", client);

  client.on('data', function(recievedData){ //manipulate the data recieved from the client.
    broadcast(recievedData, client); //this "broadcasts", or sends, the data to all the connections of the server.
  });

  client.on('end', function() {
    clients.splice(clients.indexOf(client), 1); //this chops the array down so that the client who left is no longer inside the array.
    broadcast(client.name + " left the chat.\n"); //this tells everyone that the client left the chat.
    console.log(client.name + " left the chat. I wonder why...");
  });
});

server.listen(port, function(){
  console.log("Server up and running. Listening on port " + port + ".");
});

