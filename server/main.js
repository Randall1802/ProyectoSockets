var express = require ('express');
var app = express();

/*como trabajaremos con socket, es recomendable usar el modulo HTTP para pasarle la app a express y manejar bien http*/
var server = require('http').Server(app);

/*aqui estara toda la funcionalidad de los sockets
  se requiere la libreria socket.io
  se pasa la variable server que tiene la app express y HTTP
*/
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.status(200).send("Hola Mundo geis");
});

server.listen(3010, function(){
    console.log("el server esta corriendo en http://localhost:3010")
});