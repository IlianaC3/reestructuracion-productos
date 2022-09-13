const logger = require('../operations/logger')

class UsuariosClass {
    async Login(req, res) {
        logger.info('Autorización login')
        let msg = '';
        if(req.user.email === -1) {
           msg = 'Usuario no existe';
           req.logout(function(err) {
              if (err) { return next(err); }
              res.render('error', {data: msg});
           });
        } else if (req.user.email === 0) {
           msg = 'Contraseña incorrecta';
           req.logout(function(err) {
              if (err) { return next(err); }
              res.render('error', {data: msg});
           });
        } else {
          console.log("aqui esta el problema") 
           res.redirect('/');
        }
     };
     
     async Signup(req, res) {
        logger.info('Resgistro usuario')
        let msg = '';
        if(req.user.data === -1) {
           msg = 'No se pudo crear el usuario'
           req.logout(function(err) {
              if (err) { return next(err); }
              res.render('error', {data: msg});
            });
        } else if (req.user.data === 0) {
           msg = 'Usuario ya existe'
           req.logout(function(err) {
              if (err) { return next(err); }
              res.render('error', { data: msg });
           });
        } else {
           // console.log(req.user)
           msg = req.user.data;
           req.logout(function(err) {
              if (err) { return next(err); }
              res.render('success', { data: msg });
           })
        }
     };
    
}

 module.exports = UsuariosClass