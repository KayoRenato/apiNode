const ContextStratagy = require('./db/stratagies/base/contextStrategy')
const MongoDB = require('./db/stratagies/mongodb')
const Postgres = require('./db/stratagies/postgres')

const contextMongoDB = new ContextStratagy(new MongoDB())
contextMongoDB.create('teste')

const contextPostgres = new ContextStratagy(new Postgres())
contextPostgres.create('teste')