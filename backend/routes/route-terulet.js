const express = require('express');
const router = express.Router();
const teruletdao = require('../dao/terulet-dao');

router.get('/api/getcities', async (req, res) => {
    console.log("--- getcities route")
    try{
        const cities = await teruletdao.getvarosok();
        if(!cities){
            return res.json({ success: false, message: 'Nem található város' });
        }
        
        return res.json({ success: true, message: 'Városok lekérdezése sikeres', cities: cities });
    
    } catch(err){
        return res.json({ error: 'Hiba a városok lekérdezésekor' });
    }
});

router.post('/api/getCityById', async(req, res) => {
    let id = req.body.id
    try{
        const city = await teruletdao.getVarosById(id);
        if(!city){
            return res.json({success: false, city: "Ismeretlen"});
        }

        return res.json({success: true, city: city});
    
    } catch(err){
        return res.status(500).json({error: err});
    }
});

router.post('/api/addCity', async(req, res) => {
    console.log("---[ addCity ]---");
    // console.log(req.body);
    // return;
    try{
        const success = await teruletdao.insertTerulet(req.body);
        if(!success){
            return res.json({success: false, message: 'Hiba a terület hozzáadása során / Létező terület'});
        }

        return res.json({success: true, message: 'Terület sikeresen hozzáadva'});

    } catch(err){
        return res.json({error: err});
    }
});

module.exports = router;