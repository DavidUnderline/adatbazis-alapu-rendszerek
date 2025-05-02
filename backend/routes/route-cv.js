const express = require('express');
const router = express.Router();
const cvDao = require('../dao/cv-dao');
// const { userAuth } = require('../config/auth');
// const { body, validationResult } = require('express-validator');


// Új CV link hozzáadása
router.post('/api/CVinsert', async (req, res) => {
    try {
        const cv = {cv_link, email } = req.body;

        const success = await cvDao.insertCv(cv);

        if (!success) {
          res.json({ error: 'CV feltöltés sikertelen' });
        
        } else{
          res.json({ message: 'CV sikeresen feltöltve' });
        }

    } catch (err) {
        res.json({ error: 'Hiba a CV feltöltés során' });
    }
});


// CV link lekérdezése email alapján
router.post('/api/CVget', async (req, res) => {

    try {
        const email = req.body;
        const cv_link = await cvDao.getCv(email.email);

      if (cv_link) {
        res.json(cv_link);

      } else {
        res.json({ error: 'CV nem található' });
      }
    } catch (err) {
      res.json({ error: 'Hiba a CV lekérdezésekor' });
    }
  });


// CV törlése
router.delete('/api/CVdelete', async (req, res) => {
    try {
        const cv_link = req.body.cv_link;

        const success = await cvDao.deleteCv(cv_link);

        if (success) {
          res.json({message: 'CV sikeresen törölve' });
        
        } else{
          res.json({error: 'CV nem található' });
        }
    } catch (err) {
        res.json({ error: 'Hiba a CV törlése során' });
    }
});

module.exports = router;