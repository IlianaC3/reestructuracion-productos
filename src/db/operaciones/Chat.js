const {DatabaseAutor, DatabaseMensaje } = require('../models')

class ChatDB {
    async CheckAutor(id) {
        return DatabaseAutor.find({ 'id': id }, { __v: 0 });
    } 
    
    async SaveAutor(object) {
        return DatabaseAutor.create(object);
    } 
    
    async SaveMensaje (object) {
        return DatabaseMensaje.create(object);
    } 
    
    async GetMensajes () {
        return DatabaseMensaje.find({}, { __v: 0 }).lean()
    }
    
}

module.exports = ChatDB