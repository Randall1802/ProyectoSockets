var express = require('express');
var app = express();

const cors = require('cors');

/*como trabajaremos con socket, es recomendable usar el modulo HTTP para pasarle la app a express y manejar bien http*/
var server = require('http').Server(app);

/*aqui estara toda la funcionalidad de los sockets
  se requiere la libreria socket.io
  se pasa la variable server que tiene la app express y HTTP
*/
var io = require('socket.io')(server, {
    cors: {
        origin: '*', // Dirección del servidor frontend
        methods: ['GET', 'POST']
    }
});
//array q guarda los msjs 
var messages = [{
  id: 1, 
  texto: "hola soy un mesaje de randi",
  autor: "Randi errera"
}];

/*usamos un middleware pa usar elementos estaticos en la seccion publica de la aplicacion*/
app.use(express.static('public'));

const corsOptions = {
    origin: '*', // Reemplaza con la dirección del servidor de tu frontend
    methods: ['GET', 'POST'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions));


app.get('/', function(req, res){
    res.status(200).send("Hola Mundo geis");
});

/*de esta forma activamos socket pa que escuche. mandamos un msj de control por consola pa saber q pasa y tenemos q hacer q el msj venga del nav web mediante html y js*/
io.on('connection', function(socket){
  console.log('Alguien se ha conectado con sockets')
  /* aqui controlamos los eventos del cliente mediante sockets */
  //socket.emit('messages', {
    //id: 1,
    //texto: "hola soy un mesaje de randi",
    //autor: "Randi errera"
  //});
  //modificamos el emit mandando el array
  socket.emit('messages', messages);

  //ahora queremos escuchat los msjs mandados por el cliente
  socket.on('new-message', function(data){
    //parea poder guardar estos msjs lo ideal seria en una bd
    //pa este ejercicio usaremos arrays (no good pa produccion)
    messages.push(data);
    //queremos que todos los msjs s emanden a todos los clientes
    io.sockets.emit('messages', messages);
  });
});

server.listen(3011, function(){
    console.log("el server esta corriendo en http://localhost:3011")
});