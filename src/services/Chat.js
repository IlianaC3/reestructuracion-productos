const ChatDB = require('../db/operaciones/Chat');
const Messages = require('../operations/Mesages')
const ChatClass = new ChatDB();
const Msg = new Messages();
const parseJSON = obj => JSON.parse(JSON.stringify(obj))

class Contenedor {
    constructor() {
        this.autorObject = {
            id: 0,
            nombre: '',
            apellido: '',
            edad: 0,
            avatar: '',
            alias: '',
        }
        this.object = {
            text: '',
            timestamp: '',
            autor: {}
        }
    }

    async save(chat) {
		try {
            const AutorInfo = await ChatClass.CheckAutor(chat.autor.id);
            if (AutorInfo.length > 0) {
                this.autorObject = {
                    id: chat.autor.id,
                    nombre: AutorInfo[0].nombre,
                    apellido: AutorInfo[0].apellido,
                    edad: AutorInfo[0].edad,
                    avatar: AutorInfo[0].avatar,
                    alias: AutorInfo[0].alias,
                }
            } else {
                this.autorObject = {
                    id: chat.autor.email,
                    nombre: chat.autor.nombre,
                    apellido: chat.autor.apellido,
                    edad: chat.autor.edad,
                    avatar: chat.autor.avatar,
                    alias: chat.autor.alias,
                }
                const SaveInfoAutor = await ChatClass.SaveAutor(this.autorObject);
            }
            this.object = {
                text: chat.text,
                timestamp: new Date(),
                autor: this.autorObject
            }
            let doc = await ChatClass.SaveMensaje(object);
            doc = parseJSON(doc)
            return await Msg.GenerateMessage('Mensaje', 'save', true, chat.text)
        } catch(error) {
            return await Msg.GenerateMessage('Mensaje', 'save', false, error)
        }
	}

	async getAll() {
		try {
            let docs = await ChatClass.GetMensajes();
            docs = docs.map(parseJSON)
            return docs
        } catch (error) {
            return await Msg.GenerateMessage('Mensaje', 'read', false, error)
        }
	}

}

module.exports = Contenedor;