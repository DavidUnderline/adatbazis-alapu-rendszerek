const express = require('express');
const router = express.Router();
const teruletdao = require('../dao/terulet-dao');

router.get('/api/getcities', async (req, res) => {
    // console.log("--- getcities")
    try{
        const cities = await teruletdao.getvarosok();
        if(!cities){
            res.json({ success: false, message: 'Nem található város' });
            return;
        }
        
        res.json({ success: true, message: 'Városok lekérdezése sikeres', cities: cities });
    }
    catch(err){
        res.json({ error: 'Hiba a városok lekérdezésekor' });
    }
});

module.exports = router;