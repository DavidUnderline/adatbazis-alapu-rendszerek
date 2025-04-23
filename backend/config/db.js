/*
Az Oracle Database kapcsolódási beállításokat tartalmazza
(pl. felhasználónév, jelszó, connect string).
Az RF1 jegyzet config/db.js fájlja alapján konfigurálja az adatbázis kapcsolatot.
*/
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const oracledb = require('oracledb');
const dbConfig = {
    user: "pepssoo",
    password: "123",
    connectString: "localhost/FREEPDB1",
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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { getConnection };