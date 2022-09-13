const Connections = require('./db-config');
const ConnectionO = new Connections();
require('dotenv').config();

const DBP = ConnectionO.Configuration(process.env.DBPRODUCTOS)

module.exports = { DBP };