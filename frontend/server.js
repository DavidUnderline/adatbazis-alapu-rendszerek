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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const sql = "SELECT * FROM allaskereso WHERE email = :email AND jelszo = :password";
        const params = [email, password];
        const user = await executeQuery(sql, params);
         if (user && user.length > 0) {
              res.json({ success: true, email: user[0].USERNAME });
         } else {
               res.status(401).json({ success: false, message: 'Invalid credentials' });
         }

    } catch (error) {
          res.status(500).json({ success: false, message: 'Login failed', error: error.message });
    }
});

// const email = "john.doe@example.com";
// const password = "password123";
// const params = [email, password];

// executeQuery("SELECT * FROM allaskereso WHERE email = :email and jelszo = :password", params).then((result) => {
//     console.log(result);
//     // console.log(result.length);
// });

// executeQuery("select * from allaskereso").then((result) => {
//     console.log(result);
//     // console.log(result.length);
// });

// executeQuery("SELECT * FROM TERULET").then((result) => {

// fetch data from the database
// app.get('/api/employees', async (req, res) => {
//     try {
//         const employees = await executeQuery("SELECT * FROM allaskereso");
//         res.json(employees);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch employees' });
//     }
// });

