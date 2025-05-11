const express = require('express');
const router = express.Router();
const allaslehetosegdao = require('../dao/allaslehetoseg-dao');

// Allások lekérdezése Álláskereső filterezése alapján
router.post('/api/searchjob', async (req, res) => {
    const data = req.body;

    try {
        const allasok = await allaslehetosegdao.getAllasok(data);
        // console.table(allasok);

        if(!allasok){
            return res.json({ success: false, error: 'Nem található allás' });
        
        } else{
            return res.json({ success: true, allasok });
        }
        
    } catch (err) {
        return res.json({ error: 'Hiba az allások lekérdezésekor' });
    }
});

router.post('/api/insert', async (req, res) => {
    console.log("---[ route-allaslehetoseg-insert ]---");
    // console.log(req.body);
    // return;
    const data = req.body.allaslehetoseg;

    try {
        const success = await allaslehetosegdao.insertAllas(data);
        // console.log(success);

        if (!success) {
           return res.json({ success : false, message: 'Sikertelen állásfeltöltés!' });
            
        }
        return res.json({ success : true, message: 'Sikeres állásfeltöltés, jóváhagyás alatt!' });
        
    } catch (err) {
        return res.json({ error: 'Hiba a regisztráció során' });
    }
});

router.post('/api/searchPending', async(req, res) => {
    console.log('---[ route-allasok ]---');
    try{
        const jobs = await allaslehetosegdao.getPendingAllasok();
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

router.post('/api/deleteById', async(req, res) => {
    console.log('---[ route-allaslehetoseg-delete ]---');
    const id = req.body.id;
    try{
        const jobs = await allaslehetosegdao.deleteAllasokById(id);
        if(!jobs){
            res.json({success: false, message: 'Hiba az álláslehetőség törlése során'});
            return
        }
        res.json({ success: true, message: 'Álláslehetőség sikeresen törölve' });
    }catch(err){
        console.error(err);
        res.json({success: false, message: 'Hiba az álláslehetőség törlése során'});
        throw err;
    }
});

router.post('/api/acceptPending', async(req, res) => {
    console.log('---[ route-allaslehetoseg-delete ]---');
    const id = req.body.id;
    try{
        const jobs = await allaslehetosegdao.acceptPendingAllasokById(id);
        if(!jobs){
            res.json({success: false, message: 'Hiba az álláslehetőség elfogadása során'});
            return
        }
        res.json({ success: true, message: 'Álláslehetőség sikeresen elfogadva' });
    }catch(err){
        console.error(err);
        res.json({success: false, message: 'Hiba az álláslehetőség elfogadása során'});
        throw err;
    }
});

router.post('/api/getjobsforuser', async (req, res) => {
    console.log('--- getjobsforuser ---');
    // console.log(req.body)

    try{
        const jobs = await allaslehetosegdao.getUserJobs(req.body);
        console.log(jobs)
        if(!jobs){
            return res.json({success: false, message: 'Nem található munka!', jobs: undefined});
        }

        return res.json({success: true, message: 'Még nincs rögzített munka!', jobs: jobs});
    }catch(err){
        console.error(err);
        throw err;
    }
});

module.exports = router;