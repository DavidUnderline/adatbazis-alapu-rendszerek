const express = require('express');
const router = express.Router();
const allaskeresoDao = require('../dao/allaskereso-dao');
// const { userAuth } = require('../config/auth');

// Álláskereső regisztrálása
router.post('/api/register', async (req, res) => {
    const allaskereso = req.body;
    
    try {
        const success = await allaskeresoDao.insertAllaskereso(allaskereso);

        if (!success) {
            res.json({ success : false, message: 'Regisztráció sikertelen' });
            return;
        }

        res.json({ success : true, email: allaskereso.EMAIL });

    } catch (err) {
        res.json({ error: 'Hiba a regisztráció során' });
    }
});

// Álláskereső módosítása
router.post('/api/update', async (req, res) => {
  const data = req.body.user_data;
  const allaskereso = { email: data.email };
  

  if (data.nev && data.nev.trim() != '') allaskereso.neve = data.nev;
  if (data.originalemail !== data.email) {
    allaskereso.originalemail = data.originalemail;
    allaskereso.jelszo2 = data.jelszo;
  }
  if (data.vegzettseg && data.vegzettseg.trim() != '') allaskereso.vegzettseg = data.vegzettseg;
  if (data.jelszo && data.jelszo.trim() != '') allaskereso.jelszo = data.jelszo;

  try {
    // if (!updates.taxid) {
    //     throw new Error('Email kötelező');
    // }

    const result = await allaskeresoDao.updateAllaskereso(allaskereso);
    
    if (!result.success) {
      res.json({ success : false, message: 'Adatok frissítése sikertelen' });
      return;
    }

    res.json({ success : true, email : result.email, message: 'Adatok frissítése sikeres' });

  } catch (err) {
      res.json({ error: 'Hiba az adatok frissítése során' });
  }
});

// Álláskereső adatainak lekérdezése email alapján (saját adatokhoz vagy admin)
router.post('/api/get', async (req, res) => {
    const email = req.body.email;

    try {
      const allaskereso = await allaskeresoDao.getAllaskeresoByEmail(email);
      
      if (allaskereso) {
        res.json(allaskereso);
        return;
      
      } else {
        res.json({ error: 'Álláskereső nem található' });
      }
    } catch (err) {
      res.json({ error: 'Hiba az álláskereső lekérdezésekor' });
    }
  });

  router.post('/api/applyforjob', async (req, res) => {
    const data = req.body;
    
    try {
      const result = await allaskeresoDao.applyForJob(data);
      // console.table(result);
      // console.log(result.jobs[0].ID);

      if (!result.success) {
        res.json({ success : false, message: 'Sikertelen jelentkezés' });
        return;
      }
  
      res.json({ success : true, message: 'Sikeres jelentkezés', jobs: result.jobs });

    } catch (err) {
      res.json({ error: 'Hiba a jelentkezés során' });
    }
  });

  router.post('/api/unsubscribeJob', async (req, res) => {
    const {email, job_id} = req.body;
    console.log({email, job_id});

    try{
      const success = await allaskeresoDao.unsubscribeJob(email, job_id);
      console.log(success);
      if(!success){
        res.json({ success: success, message: "Nem sikerült leiratkozni a munkáról." });
        return;
      }
      res.json({success: success, message: "Sikeresen leiratkoztál a munkáról!"});
    }catch(err){
      res.json({success: false, message: "Hiba a leiratkozás során: " + err.error});
    }
  })
  
// // Álláskereső törlése (admin vagy saját maga)
// router.delete('/:email', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
//     const email = req.params.email;
//     if (req.user.email !== email && !req.user.roles.includes('ROLE_ADMIN')) {
//         return res.status(403).json({ error: 'Nincs jogosultság' });
//     }

//     try {
//         const success = await allaskeresoDao.deleteAllaskereso(email);
//         if (success) {
//             res.json({ message: 'Álláskereső sikeresen törölve' });
//         } else {
//             res.status(404).json({ error: 'Álláskereső nem található' });
//         }
//     } catch (err) {
//         res.status(500).json({ error: 'Hiba az álláskereső törlése során' });
//     }
// });

// // CV kapcsolat törlése egy álláskeresőtől
// router.delete('/:email/cv/:cvLink', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
//     const email = req.params.email;
//     const cvLink = req.params.cvLink;
//     if (req.user.email !== email && !req.user.roles.includes('ROLE_ADMIN')) {
//         return res.status(403).json({ error: 'Nincs jogosultság' });
//     }

//     try {
//         const success = await allaskeresoDao.deleteCvFromAllaskereso(email, cvLink);
//         if (success) {
//             res.json({ message: 'CV kapcsolat sikeresen törölve' });
//         } else {
//             res.status(404).json({ error: 'CV kapcsolat nem található' });
//         }
//     } catch (err) {
//         res.status(500).json({ error: 'Hiba a CV kapcsolat törlése során' });
//     }
// });

module.exports = router;