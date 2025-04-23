const express = require('express');
const router = express.Router();
const cegDao = require('../dao/ceg-dao');

// ceg regisztralas
router.post('/api/register', async (req, res) => {
    const { id, name, email, password } = req.body;
    
    try {
        const ceg = {
            id: id,
            name: name,
            email: email,
            password: password, // Jelszó hash-elése később szükséges (pl. bcrypt)
        };

        const success = await cegDao.insertCeg(ceg);

        if (!success) {
            res.json({ success : false, message: 'Regisztráció sikertelen' });
            return;
        }

        res.json({ success : true, email: ceg.EMAIL });
    } catch (err) {
        res.status(500).json({ error: 'Hiba a regisztráció során' });
    }
});

module.exports = router;