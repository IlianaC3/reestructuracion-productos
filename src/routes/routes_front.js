const express = require('express');
const app = express();
const FrontClass = require('../controllers/Front')
const PublicAuth  = require('../controllers/auth');
const publicAuthorization = new PublicAuth();
const FrontController = new FrontClass();

app.set('view engine', 'ejs');
app.set('views', 'public');

app.get('/', publicAuthorization.publicAuthorization, FrontController.Home);

app.get('/agregar', publicAuthorization.publicAuthorization, FrontController.Agregar);
app.get('/editar/:id', publicAuthorization.publicAuthorization, FrontController.Editar);

// FAKER //
app.get('/productos-test', publicAuthorization.publicAuthorization, FrontController.ProductosTest);

// LOGIN //
app.get('/login', FrontController.LoginFront)
app.get('/logout', FrontController.Logout)

//REGISTRO
app.get('/signup', FrontController.SignupFront)

app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;
