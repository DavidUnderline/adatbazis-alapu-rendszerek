const express = require('express');
const router = express.Router();
const allasokDao = require('../dao/allasok-dao');

// Allások lekérdezése Álláskereső filterezése alapján
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

router.post('/api/insert', async (req, res) => {
    const data = req.body.allaslehetoseg;
    
    try {
        const success = await allasokDao.insertAllas(data);
        console.log(success);

        if (!success) {
            res.json({ success : false, message: 'Sikertelen állásfeltöltés!' });
            return;
        }
        res.json({ success : true, message: 'Sikeres állásfeltöltés, jóváhagyás alatt!' });
        
    } catch (err) {
        res.json({ error: 'Hiba a regisztráció során' });
    }
});

router.post('/api/searchPending', async(req, res) => {
    console.log('---[ route-allasok ]---');
    try{
        const jobs = await allasokDao.getPendingAllasok();
        if(!jobs){
            res.json({success: false, jobs: undefined});
            return
        }
        res.json({success: true, jobs: jobs.rows});
    }catch(err){
        console.error(err);
        throw err;
    }
});

module.exports = router;