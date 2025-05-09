/*
A bejelentkezési végpontot (POST /api/auth/login) kezeli, amely JWT tokent generál.
*/

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const allaskeresoDao = require('../dao/allaskereso-dao');
const adminDao = require('../dao/admin-dao')

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Bejelentkezés
router.post('/api/login', async (req, res) => {
    const { email, password, tipo } = req.body;
    if (!email || !password) {
        return res.json({ error: 'Email és jelszó kötelező' });
    }
    if(tipo === 'admin'){
        try{
            const isLogged = await adminDao.user(email, password);
            if(!isLogged){
                return res.json({success: false, message: "Érvénytelen email vagy jelszó."})
            }
            return res.json({success: true, message: ""})
            

        }catch(error){
            console.error(error);
            res.status(500).json({error: "Hiba a bejelentkezés után"})
        }
    }
    else{
        try {
            const allaskereso = await allaskeresoDao.user(email, password);

            if (!allaskereso) {
                return res.json({ success : false, error: 'Érvénytelen email vagy jelszó' });
            }

            res.json({ 
                success : true, 
                email: allaskereso[0].EMAIL,
                adoid: allaskereso[0].ADOAZONOSITO
            });

        } catch (err) {
            res.status(500).json({ error: 'Hiba a bejelentkezés során' });
            console.log(err);
        }
    }
});



module.exports = router;