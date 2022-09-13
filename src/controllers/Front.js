const logger = require('../operations/logger')
const Productos = require('../services/Productos');
const FakerProducts = require('../services/Faker')
const Producto = new Productos();
const FakerP = new FakerProducts();

class FrontClass {
	//Controllers de Front
	async Home(req, res) {
		logger.info('Ingresa a ruta home')
		Producto.getAll().then((result) => {
			let info = {
				result: result,
				name: req.user
			}
			if (result !== undefined) {
				res.render('index', { data: info});
			} else {
				res.status(404).json({
					error: `No existen productos`
				});
			}
		});
	};

	async Agregar(req, res) {
		logger.info('Ingresa a ruta agrear')
		res.render('agregar');
	};

	async Editar(req, res) {
		logger.info('Ingresa a ruta editar')
		Producto.getById(req.params.id).then((result) => {
			if (result !== undefined) {
				if (result === null) {
					res.status(404).json({
						error: `Producto no encontrado para el id ${id}`
					});
				} else {
					res.render('editar', { data: result });
				}
			} else {
				res.status(404).json({
					error: `El archivo no se puede leer`
				});
			}
		});
	};

	// FAKER //
	async ProductosTest(req, res) {
		logger.info('Ingresa a ruta productos-test')
		FakerP.FakerFunction().then((result) => {
			if (result !== undefined) {
				res.render('productos-test', { data: result });
			} else {
				res.status(404).json({
					error: `No existen productos`
				});
			}
		});	
	};

	// LOGIN //
	async LoginFront(req, res) {
		logger.info('Ingresa a ruta login')
		const person = req.user;
		if (person) {
			res.redirect('/')
		} else {
			res.render('login');
		}
	};

	async Logout(req, res) {
		logger.info('Ingresa a ruta logout')
		let nombre = req.user
		req.logout(function(err) {
			if (err) { return next(err); }
			res.render('logout', { data: nombre } );
		});
	};

	//REGISTRO
	async SignupFront(req, res) {
		logger.info('Ingresa a ruta signup')
		res.render('signup');
	};
}


module.exports = FrontClass