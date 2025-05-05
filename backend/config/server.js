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
const allaskereso = require('../routes/route-allaskereso');
const ceg = require('../routes/route-ceg');
const allasok = require('../routes/route-allasok');
const cv = require('../routes/route-cv')

app.use('/auth', authRoute);
app.use('/allaskereso', allaskereso);
app.use('/ceg', ceg);
app.use('/allasok', allasok);
app.use('/cv', cv);