//Socket

const { Server } = require("socket.io");
//DB y Clases
const Productos = require('../services/Productos');
const ChatNorm = require('../services/Chat');
const Producto = new Productos();
const ChatNormalizr = new ChatNorm();
    
//Normalizer
const normalizr = require('normalizr');
const logger = require('../operations/logger')

class Websockets {
   async websocketInit(server) {
      const io = new Server(server);
      io.on('connection', function(socket) {
          const ProductosConst = Producto.getAll().then(result => {
             logger.info('Petición inical de productos')
             if (result !== undefined) {
                return socket.emit('listProducts', result);
             } else {
                logger.error('No existen productos')
                return socket.emit('listProducts', []);
             }
          });
       
          const ChatConstN = ChatNormalizr.getAll().then(res => {
             logger.info('Lista de chats')
             if (res.includes('Error al listar todo')) {
                logger.error('No se pueden listar los chats');
                return socket.emit('listMessages', []);
             } else {
                let chatArr = {
                   "id": 0,
                   "mensajes": res
                }
                const autoresSchema = new normalizr.schema.Entity('autor', {}, {idAttribute: 'id'});
                const chatsSchema = new normalizr.schema.Entity('mensajes', {
                   autor: autoresSchema
                }, {idAttribute: 'id'});
             
                let result = normalizr.normalize(chatArr, chatsSchema);
          
                return socket.emit('listMessages', result);
             }
             
          });
          ProductosConst;
          ChatConstN;
          
       
          socket.on('messages', data => {
             logger.info('Envía mensaje')
             const ChatSave = ChatNormalizr.save(data).then(result => {
                if (result.includes("Error al leer archivo")) {
                   logger.error('No se pudo guardar el mensaje')
                } else {
                   const ChatConstN2 = ChatNormalizr.getAll().then(res => {
                      let chatArr = {
                         "id": 0,
                         "mensajes": res
                      }
                      const autoresSchema = new normalizr.schema.Entity('autor');
                      const chatsSchema = new normalizr.schema.Entity('mensajes', {
                         autor: autoresSchema
                      });
                   
                      let result = normalizr.normalize(chatArr, chatsSchema);
                      // console.log(result)
                       return socket.emit('listMessages', result);
                      
                   });
                }
                
             });
          });
       
          //Guardar productos
          socket.on('newProduct', data => {
             logger.info('Envía producto')
             const ProductosSave = Producto.save(data).then(result => {
                if (result.includes('No se pudo guardar el producto')) {
                   logger.error('No se pudo guardar el archivo');
                } else {
                   const ProductosConst2 = Producto.getAll().then(result => {
                      if (result !== undefined) {
                         return socket.emit('listProducts', result);
                      } else {
                         logger.error(`No existen productos`)
                         return socket.emit('listProducts', []);
                      }
                   });
                }
       
            });
          });
       
       });
   }
}



module.exports = Websockets