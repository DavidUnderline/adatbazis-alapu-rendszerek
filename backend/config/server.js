const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// app.use(cookieParser()); // Cookie-k kezelése JWT-hez
// app.use(express.urlencoded({ extended: true })); // URL-encoded form adatok kezelése

app.listen(port, () => {
    console.log(`Server listening on port ${port} - asd`);
});

const authRoute = require('../routes/auth');
app.use('/auth', authRoute);