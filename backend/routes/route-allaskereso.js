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
        res.status(500).json({ error: 'Hiba a regisztráció során' });
    }
});

// Álláskereső módosítása
router.post('/api/update', async (req, res) => {
  try {
    const allaskereso = { email: req.body.email };
    if (req.body.neve) allaskereso.neve = req.body.neve;
    if (req.body.originalemail) {
      allaskereso.originalemail = req.body.originalemail;
      allaskereso.jelszo2 = req.body.jelszo;
    }
    if (req.body.vegzettseg) allaskereso.vegzettseg = req.body.vegzettseg;
    if (req.body.jelszo) allaskereso.jelszo = req.body.jelszo;
  
    // if (!updates.taxid) {
    //     throw new Error('Email kötelező');
    // }

    const data = await allaskeresoDao.updateAllaskereso(allaskereso);

    if (!data.success) {
        res.json({ success : false, message: 'Adatok frissítése sikertelen' });
        return;
    }
    res.json({ success : true, email : data.email });

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
      const success = await allaskeresoDao.applyForJob(data);
      // console.table(success);

      if (!success) {
        res.json({ success : false, message: 'Sikertelen jelentkezés' });
        return;
      }
  
      res.json({ success : true, message: 'Sikeres jelentkezés' });

    } catch (err) {
      res.json({ error: 'Hiba a jelentkezés során' });
    }
  });
  
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