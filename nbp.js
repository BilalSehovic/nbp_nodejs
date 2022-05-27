const oracledb = require('oracledb');
const webServer = require('./services/web-server.js');
const dbConfig = require('./config/database.js');

async function initialize() {
  await oracledb.createPool(dbConfig.hrPool);
}

module.exports.initialize = initialize;

async function close() {
  await oracledb.getPool().close(0);
}

module.exports.close = close;

async function startup() {
  console.log('Starting application');

  try {
    console.log('Initializing web server module');

    await webServer.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
}

startup();

async function run() {

  let connection;

  try {
	connection = await oracledb.getConnection({ user: "nbp", password: "etfnbp", connectionString: "ora-02.db.lab.etf.unsa.ba/cdb1" });
	
  console.log("Successfully connected to Oracle Database");

  const result = await connection.execute(`SELECT table_name FROM all_tables WHERE owner = 'NBP'`);
  console.log(result.rows);
	

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();

async function simpleExecute(statement, binds = [], opts = {}) {
  let conn;
  let result = [];

  opts.outFormat = oracledb.OBJECT;

  try {
    conn = await oracledb.getConnection({ user: "nbp", password: "etfnbp", connectionString: "ora-02.db.lab.etf.unsa.ba/cdb1" });
    result = await conn.execute(statement, binds, opts);
    return (result);
  } catch (err) {
    console.error(err);
    throw (err);
  } finally {
    if (conn) { // conn assignment worked, need to close
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports.simpleExecute = simpleExecute;