const express = require('express');
const router = express.Router();
const allaskeresoDao = require('../dao/allaskereso-dao');
const cvDao = require('../dao/cv-dao');
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
  // const { name, email, education, password } = req.body;
  // const allaskereso = req.body;
  // console.table(allaskereso);
  
  try {

    const allaskereso = { email: req.body.email };
    if (req.body.neve) allaskereso.neve = req.body.neve;
    if (req.body.vegzettseg) allaskereso.vegzettseg = req.body.vegzettseg;
    if (req.body.jelszo) allaskereso.jelszo = req.body.jelszo;

    if (!updates.taxid) {
        throw new Error('Email kötelező');
    }
    
      const success = await allaskeresoDao.updateAllaskereso(allaskereso);

      if (!success) {
          res.json({ success : false, message: 'Adatok frissítése sikertelen' });
          return;
      }

      res.json({ success : true });
  } catch (err) {
      res.status(500).json({ error: 'Hiba az adatok frissítése során' });
  }
});

// Összes álláskereső lekérdezése (admin jogosultság szükséges)
// router.get('/', userAuth(['ROLE_ADMIN']), async (req, res) => {
//     try {
//         const allaskeresok = await allaskeresoDao.getAllAllaskeresok();
//         res.json(allaskeresok);
//     } catch (err) {
//         res.status(500).json({ error: 'Hiba az álláskeresők lekérdezésekor' });
//     }
// });


// Álláskereső adatainak lekérdezése email alapján (saját adatokhoz vagy admin)
router.post('/api/get', async (req, res) => {
    const email = req.body.email;
    try {
      const allaskereso = await allaskeresoDao.getAllaskeresoByEmail(email);
      if (allaskereso) {
        res.json(allaskereso);
      } else {
        res.status(404).json({ error: 'Álláskereső nem található' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Hiba az álláskereső lekérdezésekor' });
    }
  });


// // Új CV hozzáadása egy álláskeresőhöz
// router.post('/:email/cv', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
//     const email = req.params.email;
//     const { cv_link } = req.body;
//     if (!cv_link) {
//         return res.status(400).json({ error: 'CV link kötelező' });
//     }
//     if (req.user.email !== email && !req.user.roles.includes('ROLE_ADMIN')) {
//         return res.status(403).json({ error: 'Nincs jogosultság' });
//     }

//     try {
//         const cvExists = await cvDao.getCv(cv_link);
//         if (!cvExists) {
//             await cvDao.insertCv(cv_link);
//         }
//         const success = await allaskeresoDao.addCvToAllaskereso(email, cv_link);
//         if (success) {
//             res.status(201).json({ message: 'CV sikeresen hozzáadva' });
//         } else {
//             res.status(500).json({ error: 'CV hozzáadása sikertelen' });
//         }
//     } catch (err) {
//         res.status(500).json({ error: 'Hiba a CV hozzáadása során' });
//     }
// });

// // Jelszó módosítása
// router.put('/:email/password', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
//     const email = req.params.email;
//     const { jelszo } = req.body;
//     if (!jelszo) {
//         return res.status(400).json({ error: 'Jelszó kötelező' });
//     }
//     if (req.user.email !== email && !req.user.roles.includes('ROLE_ADMIN')) {
//         return res.status(403).json({ error: 'Nincs jogosultság' });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(jelszo, 10);
//         const success = await allaskeresoDao.updatePassword(email, hashedPassword);
//         if (success) {
//             res.json({ message: 'Jelszó sikeresen módosítva' });
//         } else {
//             res.status(404).json({ error: 'Álláskereső nem található' });
//         }
//     } catch (err) {
//         res.status(500).json({ error: 'Hiba a jelszó módosítása során' });
//     }
// });

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