const express = require('express');
const router = express.Router();
const allaskeresoDao = require('../dao/allaskereso-dao');
const cvDao = require('../dao/cv-dao');
const { userAuth } = require('../config/auth');

// Összes álláskereső lekérdezése (admin jogosultság szükséges)
router.get('/', userAuth(['ROLE_ADMIN']), async (req, res) => {
    try {
        const allaskeresok = await allaskeresoDao.getAllAllaskeresok();
        res.json(allaskeresok);
    } catch (err) {
        res.status(500).json({ error: 'Hiba az álláskeresők lekérdezésekor' });
    }
});

// Álláskereső regisztrálása
router.post('/register', async (req, res) => {
    const { email, neve, jelszo, vegzettseg, cv_links } = req.body;
    if (!email || !neve || !jelszo) {
        return res.status(400).json({ error: 'Email, név és jelszó kötelező' });
    }

    try {
        const hashedPassword = await bcrypt.hash(jelszo, 10);
        const allaskereso = {
            email,
            neve,
            jelszo: hashedPassword, // Jelszó hash-elése később szükséges (pl. bcrypt)
            vegzettseg,
            statusz: 0
        };

        const success = await allaskeresoDao.insertAllaskereso(allaskereso);
        if (!success) {
            return res.status(500).json({ error: 'Regisztráció sikertelen' });
        }

        // CV-k hozzárendelése, ha megadtak
        if (cv_links && Array.isArray(cv_links)) {
            for (const cv_link of cv_links) {
                const cvExists = await cvDao.getCv(cv_link);
                if (!cvExists) {
                    await cvDao.insertCv(cv_link);
                }
                await allaskeresoDao.addCvToAllaskereso(email, cv_link);
            }
        }

        res.status(201).json({ message: 'Sikeres regisztráció' });
    } catch (err) {
        res.status(500).json({ error: 'Hiba a regisztráció során' });
    }
});

// Álláskereső adatainak lekérdezése email alapján (saját adatokhoz vagy admin)
router.get('/:email', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
    const email = req.params.email;
    const isAdmin = req.user.roles.includes('ROLE_ADMIN');
    if (!isAdmin && req.user.email !== email) {
        return res.status(403).json({ error: 'Nincs jogosultság' });
    }

    try {
        const allaskereso = await allaskeresoDao.getAllaskeresoByEmail(email, isAdmin);
        if (allaskereso) {
            res.json(allaskereso);
        } else {
            res.status(404).json({ error: 'Álláskereső nem található' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Hiba az álláskereső lekérdezésekor' });
    }
});

// Új CV hozzáadása egy álláskeresőhöz
router.post('/:email/cv', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
    const email = req.params.email;
    const { cv_link } = req.body;
    if (!cv_link) {
        return res.status(400).json({ error: 'CV link kötelező' });
    }
    if (req.user.email !== email && !req.user.roles.includes('ROLE_ADMIN')) {
        return res.status(403).json({ error: 'Nincs jogosultság' });
    }

    try {
        const cvExists = await cvDao.getCv(cv_link);
        if (!cvExists) {
            await cvDao.insertCv(cv_link);
        }
        const success = await allaskeresoDao.addCvToAllaskereso(email, cv_link);
        if (success) {
            res.status(201).json({ message: 'CV sikeresen hozzáadva' });
        } else {
            res.status(500).json({ error: 'CV hozzáadása sikertelen' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Hiba a CV hozzáadása során' });
    }
});

// Jelszó módosítása
router.put('/:email/password', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
    const email = req.params.email;
    const { jelszo } = req.body;
    if (!jelszo) {
        return res.status(400).json({ error: 'Jelszó kötelező' });
    }
    if (req.user.email !== email && !req.user.roles.includes('ROLE_ADMIN')) {
        return res.status(403).json({ error: 'Nincs jogosultság' });
    }

    try {
        const hashedPassword = await bcrypt.hash(jelszo, 10);
        const success = await allaskeresoDao.updatePassword(email, hashedPassword);
        if (success) {
            res.json({ message: 'Jelszó sikeresen módosítva' });
        } else {
            res.status(404).json({ error: 'Álláskereső nem található' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Hiba a jelszó módosítása során' });
    }
});

// Álláskereső törlése (admin vagy saját maga)
router.delete('/:email', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
    const email = req.params.email;
    if (req.user.email !== email && !req.user.roles.includes('ROLE_ADMIN')) {
        return res.status(403).json({ error: 'Nincs jogosultság' });
    }

    try {
        const success = await allaskeresoDao.deleteAllaskereso(email);
        if (success) {
            res.json({ message: 'Álláskereső sikeresen törölve' });
        } else {
            res.status(404).json({ error: 'Álláskereső nem található' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Hiba az álláskereső törlése során' });
    }
});

// CV kapcsolat törlése egy álláskeresőtől
router.delete('/:email/cv/:cvLink', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
    const email = req.params.email;
    const cvLink = req.params.cvLink;
    if (req.user.email !== email && !req.user.roles.includes('ROLE_ADMIN')) {
        return res.status(403).json({ error: 'Nincs jogosultság' });
    }

    try {
        const success = await allaskeresoDao.deleteCvFromAllaskereso(email, cvLink);
        if (success) {
            res.json({ message: 'CV kapcsolat sikeresen törölve' });
        } else {
            res.status(404).json({ error: 'CV kapcsolat nem található' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Hiba a CV kapcsolat törlése során' });
    }
});

module.exports = router;