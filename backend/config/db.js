const oracledb = require('oracledb');
const dbConfig = {
    user: "pepssoo",
    password: "123",
    connectString: "localhost/FREEPDB1",
};

async function executeQuery(sql, params = []) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(sql, params, {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
            autoCommit: true
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

module.exports = { executeQuery };