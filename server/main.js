var express = require('express');
var app = express();

/*como trabajaremos con socket, es recomendable usar el modulo HTTP para pasarle la app a express y manejar bien http*/
var server = require('http').Server(app);

/*aqui estara toda la funcionalidad de los sockets
  se requiere la libreria socket.io
  se pasa la variable server que tiene la app express y HTTP
*/
var io = require('socket.io')(server);

/*usamos un middleware pa usar elementos estaticos en la seccion publica de la aplicacion*/
app.use(express.static('public'));

app.get('/', function(req, res){
    res.status(200).send("Hola Mundo geis");
});

/*de esta forma activamos socket pa que escuche. mandamos un msj de control por consola pa saber q pasa y tenemos q hacer q el msj venga del nav web mediante html y js*/
io.on('connection', function(socket){
  console.log('Alguien se ha conectado con sockets');
});

server.listen(3011, function(){
    console.log("el server esta corriendo en http://localhost:3011")
});