const oracledb = require('oracledb');

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