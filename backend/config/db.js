/*
Az Oracle Database kapcsolódási beállításokat tartalmazza
(pl. felhasználónév, jelszó, connect string).
Az RF1 jegyzet config/db.js fájlja alapján konfigurálja az adatbázis kapcsolatot.
*/
const express = require('express');
// const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const oracledb = require('oracledb');

const dbConfig = {
    user: 'system',
    password: '123',
    connectString: 'localhost/FREE'
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