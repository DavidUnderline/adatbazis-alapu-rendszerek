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
            password: password,
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

//ceg modositasa
router.post('/api/update', async (req, res) => {
  const { taxid, name, email, password, tipo } = req.body;
  // const allaskereso = req.body;
  // console.table(allaskereso);
  
  try {
      if(!tipo){
        res.json({ success : false, message: 'Ez nem allaskereso' });
      }
      
      const ceg = {
        taxid,
        name,
        email,
        password
      }

      const success = await cegDao.updateCeg(ceg);

      if (!success) {
          res.json({ success : false, message: 'Adatok frissítése sikertelen' });
          return;
      }

      res.json({ success : true });
  } catch (err) {
      res.status(500).json({ error: 'Hiba az adatok frissítése során' });
  }
});

// ceg lekerdezese email alapjan
router.post('/api/get', async (req, res) => {
    const email = req.body.email;

    try{
        const ceg = await cegDao.getCegByEmail(email);
        if(!ceg){
            res.status(401).json({error: 'Cég nem található'});
        }
        res.json({success: true, ceg: ceg});
    }catch(err){
        res.status(500).json({ error: 'Hiba a cég lekérdezésekor'});
    }
})

module.exports = router;