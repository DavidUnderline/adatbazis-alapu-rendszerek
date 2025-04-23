const { getConnection } = require('./db');
const oracledb = require('oracledb');
const dbConfig = {
    user: 'system',
    password: '123',
    connectString: 'localhost/FREE'
};

async function executeQuery(sql, params = []) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(sql, params, {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
        });
        return result.rows;

    } catch (err) {
        console.error(err);
        throw err;
        
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

executeQuery("SELECT * FROM allaslehetoseg").then((result) => {
    console.log(result.length);
});

async function testConnection() {
    let connection;
    try {
        connection = await getConnection();
        console.log('Connection successful!');
    } catch (err) {
        console.error('Connection failed:', err);
    } finally {
        if (connection) await connection.close();
    }
}
testConnection();