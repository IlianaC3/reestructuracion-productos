const { mongodb, mysql, mysqlLocal, mongodbLocal } = require('./connections')

class Config {
	Configuration(seleccion) {
		let db;
		switch(seleccion) {
			case 'mongodb':
				db = mongodb
				break;
			case 'mongodbLocal':
				db = mongodbLocal
				break;
			case 'mysql':
				db = mysql
				break;
			case 'mysqlLocal':
				db = mysqlLocal
				break;
			default:
				db = mongodb
				break;
		}
		return db;
	}
}



module.exports = Config;
