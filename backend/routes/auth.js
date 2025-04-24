/*
A bejelentkezési végpontot (POST /api/auth/login) kezeli, amely JWT tokent generál.
*/

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const allaskeresoDao = require('../dao/allaskereso-dao');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Bejelentkezés
router.post('/api/login', async (req, res) => {
    const { email, password, tipo } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email és jelszó kötelező' });
    }

    try {
        const allaskereso = await allaskeresoDao.user(email, password, tipo);

        if (!allaskereso) {
            return res.status(401).json({ error: 'Érvénytelen email vagy jelszó' });
        }
        
        res.json({ success : true, email: allaskereso.EMAIL });

        // const isPasswordValid = await bcrypt.compare(password, allaskereso.JELSZO);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ error: 'Érvénytelen email vagy jelszó' });
        // }

        // JWT token generálása
        // const token = jwt.sign(
        //     { email: allaskereso.EMAIL, roles: ['ROLE_USER'] }, // Admin szerepkör külön logika
        //     JWT_SECRET,
        //     { expiresIn: '1h' }
        // );

        // await allaskeresoDao.updateLastLogin(email);
        // res.json({ token, message: 'Sikeres bejelentkezés' });
    } catch (err) {
        res.status(500).json({ error: 'Hiba a bejelentkezés során' });
        console.log(err);
    }
});



module.exports = router;