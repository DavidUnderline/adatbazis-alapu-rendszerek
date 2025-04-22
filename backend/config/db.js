/*
Az Oracle Database kapcsolódási beállításokat tartalmazza
(pl. felhasználónév, jelszó, connect string).
Az RF1 jegyzet config/db.js fájlja alapján konfigurálja az adatbázis kapcsolatot.
*/
const oracledb = require('oracledb');

const dbConfig = {
    user: 'YOUR_USER',
    password: 'YOUR_PASSWORD',
    connectString: 'YOUR_HOST:PORT/YOUR_SERVICE_NAME'
};
// YOUR_USER, YOUR_PASSWORD, YOUR_HOST:PORT/YOUR_SERVICE_NAME Saját bejelentkezési adatok a database-be

async function getConnection() {
    try {
        return await oracledb.getConnection(dbConfig);
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
}

module.exports = { getConnection };