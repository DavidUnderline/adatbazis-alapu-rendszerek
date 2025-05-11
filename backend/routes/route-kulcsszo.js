const express = require('express');
const router = express.Router();
const kulcsszoDao = require('../dao/kulcsszo-dao');

// Kulcsszavak lekérdezése álláslehetőség ID alapján
router.post('/api/getByAllaslehetosegId', async (req, res) => {
    // kulcsszoban benne kell legyen az allaslehetoseg id
    const kulcsszo = req.body;
    try {
        const result = await kulcsszoDao.getKulcsszoByAllaslehetosegId(kulcsszo);
        if (result.length === 0) {
            res.json({ success: false, message: 'Nincs kulcsszó ehhez az álláslehetőséghez' });
            return;
        }
        res.json({ success: true, kulcsszavak: result });
    } catch (err) {
        res.status(500).json({ error: 'Hiba a kulcsszavak lekérdezése során' });
    }
});

// Kulcsszó törlése
router.post('/api/delete', async (req, res) => {
    // kulcsszoban benne kell legyen a neve
    const kulcsszo = req.body;
    try {
        const success = await kulcsszoDao.deleteKulcsszo(kulcsszo);
        if (!success) {
            res.json({ success: false, message: 'Kulcsszó törlése sikertelen' });
            return;
        }
        res.json({ success: true, message: 'Kulcsszó sikeresen törölve' });
    } catch (err) {
        res.status(500).json({ error: 'Hiba a kulcsszó törlése során' });
    }
});

module.exports = router;