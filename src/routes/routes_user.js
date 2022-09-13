const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'public');
const passport = require('passport');
const UsuariosClass = require('../controllers/Usuarios');
const UsuariosController = new UsuariosClass();

app.post('/login', passport.authenticate('authentication'), UsuariosController.Login)

app.post('/signup', passport.authenticate('registration'), UsuariosController.Signup)

module.exports = app