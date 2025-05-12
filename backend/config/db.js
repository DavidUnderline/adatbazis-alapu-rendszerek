const oracledb = require('oracledb');
const dbConfig = {
    user: "system",
    password: "123",
    connectString: "localhost/FREE",
};

// const dbConfig = {
//     user: "pepssoo",
//     password: "123",
//     connectString: "localhost/FREEPDB1"
// };

async function executeQuery(sql, params = {}) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(sql, params, {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
            autoCommit: true
        });
        return result.rows || result.rowsAffected;
        
    } catch (err) {
        console.error(err);
        throw err;
        
    } finally {
        if (connection) {
            try {
                await connection.close();
                
            } catch (err) {
                console.error("\n\n\n\n\nError executing the query:\t",err);
            }
        }
    }
}

async function getConnection() {
    try {
        return await oracledb.getConnection(dbConfig);
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
}

module.exports = { executeQuery, getConnection };