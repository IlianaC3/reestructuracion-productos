const { Connection, mongoose } = require('./mongoose')
const Con = Connection();

//Bases de datos
const DatabaseAutor =  mongoose.model('autor', {
    id: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
});

const DatabaseMensaje = mongoose.model('mensajes', {
    text: { type: String, required: true },
    timestamp: { type: Date, default: new Date(), required: true },
    autor: { type: {}, required: true }
});

const DatabaseUsuarios = mongoose.model('usuarios', {
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = { DatabaseAutor, DatabaseMensaje, DatabaseUsuarios, Con }