const express = require('express');
const router = express.Router();
const allasokDao = require('../dao/allasok-dao');

// Allások lekérdezése
router.post('/api/searchjob', async (req, res) => {
    const data = req.body;

    try {
        const allasok = await allasokDao.getAllasok(data);

        if(!allasok){
            res.json({ error: 'Nem található allás' });
            return;
        }
        else
            res.json(allasok);
        
    } catch (err) {
        res.status(500).json({ error: 'Hiba az allások lekérdezésekor' });
    }
});

module.exports = router;