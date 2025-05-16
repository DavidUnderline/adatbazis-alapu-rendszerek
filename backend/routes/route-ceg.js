const express = require('express');
const router = express.Router();
const cegDao = require('../dao/ceg-dao');

// ceg regisztralas
router.post('/api/register', async (req, res) => {
  const { id, name, email, password } = req.body;
  console.log("---[ Ceg register ]---");
  try {
    const ceg = {
      id: id,
      name: name,
      email: email,
      password: password,
    };
    console.log(ceg);
    const success = await cegDao.insertCeg(ceg);

    if (!success) {
      res.json({ success: false, message: 'A megaddott email már regisztrált!' });
      return;
    }

    res.json({ success: true, email: ceg.EMAIL });
    
  } catch (err) {
    res.status(500).json({ error: err, personal_message: 'A megaddott adoazonosító már regisztrált!'});
  }
});

//ceg modositasa
router.post('/api/update', async (req, res) => {
  const ceg = {
    email: req.body.data.email
  };

  //   console.log(req.body.data);

  if (req.body.data.adoazonosito && req.body.data.adoazonosito.trim() != '')
    ceg.adoazonosito = req.body.data.adoazonosito;

  if (req.body.data.nev && req.body.data.nev.trim() != '')
    ceg.nev = req.body.data.nev;

  if (req.body.data.jelszo)
    ceg.jelszo = req.body.data.jelszo;

  if (req.body.data.originalemail)
    ceg.originalemail = req.body.data.originalemail;

  //   console.table(ceg);
  //   return;

  try {
    const success = await cegDao.updateCeg(ceg);

    if (!success) {
      res.json({ success: false, message: 'Adatok frissítése sikertelen' });
      return;
    }

    res.json({ success: true, message: 'Adatok frissítése sikeres', email: ceg.email });
  } catch (err) {
    res.status(500).json({ error: 'Hiba az adatok frissítése során' });
  }
});

// ceg lekerdezese email alapjan
router.post('/api/get', async (req, res) => {
  console.log("---[ getCegByEmail ]---");
  // console.log(req.body);
  const email = req.body.email;

  try {
    const ceg = await cegDao.getCegByEmail(email);
    if (!ceg) {
      return res.json({ error: 'Cég nem található' });
    }
    return res.json({ success: true, ceg: ceg });
  } catch (err) {
    res.json({ error: 'Hiba a cég lekérdezésekor' });
  }
});

router.post('/api/getCegByAdo', async (req, res) => {
  console.log("---[ getCegByAdo ]---")
  console.log(req.body)

  const adoazonosito = req.body.adoazonosito;

  try {
    const nev = await cegDao.getCegByAdo(adoazonosito);
    if (!nev) {
      res.status(401).json({})
    }
    res.json({ success: true, name: nev });
  } catch (err) {
    console.error(err);
    throw err;
  }
});

router.post('/api/setCegErtekeles', async (req, res) => {
  console.log('--- setCegErtekeles ---');
  const { rating, user_email, ceg_ado } = req.body
  console.log({
    rating: rating,
    user_email: user_email,
    ceg_ado: ceg_ado
  });
  try {
    const result = await cegDao.setCegErtekeles(rating, user_email, ceg_ado);
    console.log(result);
    if (!result) {
      res.json({ success: false, message: "nem sikerült értékelni..." })
    }
    res.json({ success: true, message: "" })
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Hibakód: " + err.errorNum });
  }
});

router.post('/api/getCegErtekeles', async (req, res) => {
  console.log("--- getCegErtekeles ---")
  const { ceg_ado, user_email } = req.body;
  console.log([ceg_ado, user_email])
  try {
    const result = await cegDao.getCegErtekeles(ceg_ado, (!user_email) ? '' : user_email);
    if(!result) res.json({success: false, message: "nem található értékelés"});
    res.json({success: true, result: result})
  } catch (err) { console.error(err) }
})

module.exports = router;