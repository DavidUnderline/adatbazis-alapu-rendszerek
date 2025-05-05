const express = require('express');
const router = express.Router();
const allasokDao = require('../dao/allasok-dao');

// Allások lekérdezése
router.post('/api/searchjob', async (req, res) => {
    const data = req.body;

    try {
        const allasok = await allasokDao.getAllasok(data);
        // console.table(allasok);

        if(!allasok){
            res.json({ success: false, error: 'Nem található allás' });
            return;
        
        } else{
            res.json({ success: true, allasok });
        }
        
    } catch (err) {
        res.json({ error: 'Hiba az allások lekérdezésekor' });
    }
});

module.exports = router;