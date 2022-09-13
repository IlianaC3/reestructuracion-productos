const { DatabaseUsuarios } = require('../models')

class Usuarios {
    async CheckUser(email) {
        return DatabaseUsuarios.find({ 'email': email }, { __v: 0 });
    } 
    
    async SaveUsuario(object) {
        return DatabaseUsuarios.create(object);
    } 
    
    async FindUser(email) {
        // console.log(DatabaseUsuarios.findOne({ 'email': email }, { __v: 0 }))
        return DatabaseUsuarios.findOne({ 'email': email }, { __v: 0 });
    } 
}


module.exports = Usuarios;