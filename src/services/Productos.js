const ProductosDB = require('../db/operaciones/Productos')
const Producto = new ProductosDB();

class Contenedor {

	async save(product) {
		return await Producto.SaveProduct(product)
	}

	async getById(id) {
		return await Producto.ProductId(id)
	}

	async getAll() {
		return await Producto.ProductAll()
	}

	async updateById(id, product) {
		return await Producto.UpdateProduct(id, product)
	}

	async deleteById(id) {
		return await Producto.DeleteProduct(id)
	}
}

module.exports = Contenedor;
