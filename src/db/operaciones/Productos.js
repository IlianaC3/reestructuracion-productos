const { DBP } = require('../mysql')
const Messages = require('../../operations/Mesages')
const Msg = new Messages();

class Productos {
	async SaveProduct (product) {
		return DBP('productos').insert(product)
		.then((id) => {
			return Msg.GenerateMessage('Producto', 'save', true, id);
		})
		.catch((err) => {
			return Msg.GenerateMessage('Producto', 'save', false, err);
		});
	}
	
	async ProductId(id) {
		return DBP('productos')
				.select({
					id: 'id',
					title: 'title',
					price: 'price',
					thumbnail: 'thumbnail'
				})
				.where({ id })
				.then((productos) => {
					return productos[0];
				})
				.catch((err) => {
					return Msg.GenerateMessage('Producto', 'read', false, id);
				});
	}
	
	async ProductAll() {
		return DBP('productos')
				.select({
					id: 'id',
					title: 'title',
					price: 'price',
					thumbnail: 'thumbnail'
				})
				.then((productos) => {
					return productos;
				})
				.catch((err) => {
					console.error(err);
					return Msg.GenerateMessage('Productos', 'read', false, err);
				});
	}
	
	async UpdateProduct(id, product) {
		return DBP('productos')
				.update(product)
				.where({ id })
				.then((result) => {
					return result > 0 ? Msg.GenerateMessage('Producto', 'update', true, id) : Msg.GenerateMessage('Producto', 'update', false, id);
				})
				.catch((err) => {
					return Msg.GenerateMessage('Producto', 'update', false, err);
				});
	}
	
	async DeleteProduct(id) {
		return DBP('productos')
		.delete()
		.where({ id })
		.then((result) => {
			return result > 0 ? Msg.GenerateMessage('Producto', 'delete', true, id) : Msg.GenerateMessage('Producto', 'delete', false, id);
		})
		.catch((err) => {
			return Msg.GenerateMessage('Producto', 'delete', false, err);
		});
	}
}


module.exports = Productos;