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
  const ceg = {
    email: req.body.data.email
  };

//   console.log(req.body.data);

  if(req.body.data.adoazonosito) 
    ceg.adoazonosito = req.body.data.adoazonosito;

  if(req.body.data.nev) 
    ceg.nev = req.body.data.nev;

  if(req.body.data.jelszo) 
    ceg.jelszo = req.body.data.jelszo;

  if(req.body.data.originalemail)
    ceg.originalemail = req.body.data.originalemail;

//   console.table(ceg);
//   return;
  
  try {
    const success = await cegDao.updateCeg(ceg);

    if (!success) {
        res.json({ success : false, message: 'Adatok frissítése sikertelen' });
        return;
    }

    res.json({ success : true, message: 'Adatok frissítése sikeres', email: ceg.email });
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