const { getConnection } = require('./config/db');
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