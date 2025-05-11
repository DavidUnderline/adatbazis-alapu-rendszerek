const express = require('express');
const router = express.Router();
const kulcsszoDao = require('../dao/kulcsszo-dao');

// Kulcsszó beszúrása
router.post('/api/addkeyword', async (req, res) => {
    // console.log(req.body);
    // return;

    const keyword = req.body;

    try {
        const success = await kulcsszoDao.insertkeyword(keyword);
        if (!success) {
            return res.json({ success: false, message: 'Létező kulcsszó!' });
        }

        return res.json({ success: true, message: 'Kulcsszó sikeresen hozzáadva!' });

    } catch (err) {
        return res.json({ success: false, message: 'Hiba a kulcsszó beszúrása során!' });
    }
});

// Kulcsszó lekérdezése név alapján
router.get('/api/getkeywords', async (req, res) => {
    console.log('--- get keywords route ---');
    // console.log(req.body)

    try {
        const keywords = await kulcsszoDao.getkeywords();
        // console.log(keywords);

        if (keywords.length === 0) {
            res.json({ success: false, message: 'Nincs kulcsszó az adatbázisban' });
            return;
        }

        return res.json({ success: true, keywords: keywords });
    } catch (err) {
        res.json({ error: 'Hiba a kulcsszó lekérdezése során' });
    }
});

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