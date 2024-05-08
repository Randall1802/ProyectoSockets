/*creamos la variable que va a premitir al frontend conectarse a nuestro backend */
//var io = require('socket.io')(server);

var socket = io.connect('http://localhost:3011', {'forceNew' : true});

/*esto manda al server el msj de connect y aparece en console.log */