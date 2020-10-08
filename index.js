const express = require('express')
const http = require("http") // adicionar
const consign = require("consign")
const jwt = require("jsonwebtoken");
const cors = require('cors')
var cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(cookieParser());

const path = require('path'); 

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

const server = http.Server(app) // adicionar

app.use(cors({ origin: 'http://localhost:8080', credentials: true }))

app.set('jwt', jwt)

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static("uploads"))

consign({ cwd: 'src' })
    .include("db")
    .then("utils")
    .then("middlewares")
    .then("models")
    .then("controllers")
    .then("routes")
    .into(app)

const io = require("socket.io")(server)
let usuarios_conectados = 0;
io.on('connection', (client) => {
    console.log("Um usuário conectado")
    usuarios_conectados++;

    client.broadcast.emit('usuarios_conectados', usuarios_conectados)
    client.emit('usuarios_conectados', usuarios_conectados)

    client.on('disconnect', () => {
        usuarios_conectados--;
        console.log("Um usuário se desconectou")
        client.broadcast.emit('usuarios_conectados', usuarios_conectados)
    })
    
})


server.listen(8000, function() { // modificar
    console.log("Servidor rodando na porta 8000");
})