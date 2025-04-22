const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
    user: "pepssoo",
    password: "123",
    connectString: "localhost/FREEPDB1",
};

// Function to connect to the database and execute a query
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

executeQuery("SELECT * FROM allaskereso").then((result) => {
    console.log(result.length);
});

// Example route to fetch data from the database
// app.get('/api/employees', async (req, res) => {
//     try {
//         const employees = await executeQuery("SELECT * FROM employees"); // Replace with your query
//         res.json(employees);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch employees' });
//     }
// });

 // Route to handle login
//  app.post('/api/login', async (req, res) => {
//      const { username, password } = req.body;

//      try {
//          // Important:  DO NOT store the password directly in the database if you can avoid it.
//          //  Use a secure hashing method (like bcrypt) to store password hashes.
//          //  For this example, we'll just check against the provided password (which is insecure).
//          const sql = "SELECT username FROM employees WHERE username = :username AND password = :password"; // VERY INSECURE
//          const params = [username, password];
//          const user = await executeQuery(sql, params);
//           if (user && user.length > 0) {
//                res.json({ success: true, username: user[0].USERNAME }); //Return username
//           } else {
//                 res.status(401).json({ success: false, message: 'Invalid credentials' });
//           }

//      } catch (error) {
//            res.status(500).json({ success: false, message: 'Login failed', error: error.message });
//      }
//  });

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });
