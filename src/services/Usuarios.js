const UsuariosDB = require('../db/operaciones/Usuarios')
const Usuario = new UsuariosDB();
const bcrypt = require('bcrypt');
const { parseJSON } = require('../operations/parseJson')

class Contenedor {
    constructor(){
        this.userObject = {
            email: '',
            nombre: '',
            password: ''
        }
        this.info = {
            email: '',
            nombre: ''
        }
    }
    async save(usuario) {
		try {
            const usuarioInfo = await Usuario.CheckUser(usuario.email);
            if (usuarioInfo.length < 1) {
                let salt = bcrypt.genSaltSync(10);
				let hash = bcrypt.hashSync(usuario.password, salt);
                this.userObject = {
                    email: usuario.email,
                    nombre: usuario.name,
                    password: hash
                };
                console.log(this.userObject)
                let doc = await Usuario.SaveUsuario(userObject);
                console.log(doc)
                doc = parseJSON(doc)
                return this.userObject
            } else {
                return null;
            }
            
        } catch(error) {
            return undefined;
        }
	}

	async loginUser(usuario) {
		try {
            const docs = await Usuario.FindUser(usuario.email);
            // console.log(docs)
            let hash = docs.password;
			let verify = bcrypt.compareSync(usuario.password, hash);
			
            if (verify) {
                this.info = {
                    email: docs.email,
                    nombre: docs.nombre
                }
                return this.info
            } else {
                return null
            }
            } catch (error) {
                return undefined
        }
	}

}

module.exports = Contenedor;