//Config Inicial
require('dotenv').config();
const http = require('http');
const cluster = require('cluster');
const express = require('express');
const os = require('os');
const app = express();
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./src/controllers/passport')

//Websocket
const websocket = require('./src/controllers/websockets');
const websocketInit = new websocket();
websocketInit.websocketInit(server)

//PUERTO
const minimist = require('minimist');
const minimistArg = minimist(process.argv, { alias: {'p': 'port'}});
const port = minimistArg.port || process.env.PORT || 3000;
const mode = process.env.MODE || 'FORK';

//Configuracion PID
const numeroCpus = os.cpus().length;
const processId = process.pid;
const isMaster = cluster.isMaster;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//SESSION
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: true,
	saveUninitialized: false,
	rolling: true,
	cookie: {
		maxAge: 600000
	}
 }))

app.use(passport.initialize());
app.use(passport.session());

const routes_user = require('./src/routes/routes_user');
app.use("/api/user", routes_user);

const routes_info = require('./src/routes/routes_info');
app.use('/random', routes_info)

const routes_back = require('./src/routes/routes_back');
app.use("/api/productos", routes_back);

const routes_faker = require('./src/routes/routes_faker');
app.use("/api/productos-test", routes_faker);

const routes_front = require('./src/routes/routes_front');
app.use('', routes_front)

if (cluster.isMaster && mode === 'CLUSTER') {
   for (let i = 0; i < numeroCpus; i++) {
     cluster.fork();
   }
   cluster.on('exit', (worker) => {
     console.log(`Proceso worker con PID ${worker.process.pid} salio`);
   });
} else {
   server.listen(port, () => {
      console.log(`Servidor express - Puerto ${port} - PID ${processId} - Fecha y hora ${(new Date().toLocaleString())}`);
   });
}