/*
A fő szerver fájl, amely inicializálja az Express szervert,
betölti a middleware-eket, route-okat,
és a 8080-as porton indítja a szervert (az RF1 jegyzet alapján).
*/
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jobRoutes = require('./routes/route-jobs');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:4200' })); // Angular front-end támogatása
app.use(express.json()); // JSON kérések kezelése
app.use(cookieParser()); // Cookie-k kezelése JWT-hez
app.use(express.urlencoded({ extended: true })); // URL-encoded form adatok kezelése

// Routes
app.use('/api/jobs', jobRoutes);

// Szerver indítása
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});