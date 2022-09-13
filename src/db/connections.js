//CLASE 28 ENV
require('dotenv').config();

const mongodb = {
	cnxStr: `mongodb+srv://${process.env.MONGO_ATLAS_USER}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.MONGO_DATABASE}`,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000
	}
};

const mysql = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.HOST_MYSQL,
		port: process.env.PORT_MYSQL,
		user: process.env.USER_MYSQL,
		password: process.env.USER_MYSQL_PASS,
		database: process.env.DATABASE_MYSQL
	},
	pool: { min: 2, max: 8 }
});

const mysqlLocal = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.HOST_MYSQL_LOCAL,
		port: process.env.PORT_MYSQL,
		user: process.env.USER_MYSQL_LOCAL,
		password: process.env.USER_MYSQL_PASS_LOCAL,
		database: process.env.DATABASE_MYSQL_LOCAL
	},
	pool: { min: 2, max: 8 }
});

const mongodbLocal = {
	cnxStr: `mongodb://localhost:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000
	}
};

module.exports = {mongodb, mysql, mysqlLocal, mongodbLocal}