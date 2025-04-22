const express = require('express');
const router = express.Router();
const cvDao = require('../dao/cv-dao');
const { getConnection } = require('../config/db');
const { userAuth } = require('../config/auth');

// Összes CV link lekérdezése (admin jogosultság szükséges)
router.get('/', userAuth(['ROLE_ADMIN']), async (req, res) => {
    try {
        const cvs = await cvDao.getAllCvs();
        res.json(cvs);
    } catch (err) {
        res.status(500).json({ error: 'Hiba a CV-k lekérdezésekor' });
    }
});

// Egy adott CV link lekérdezése
router.get('/:cvLink', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
    const cvLink = req.params.cvLink;
    try {
        const cv = await cvDao.getCv(cvLink);
        if (cv) {
            res.json(cv);
        } else {
            res.status(404).json({ error: 'CV nem található' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Hiba a CV lekérdezésekor' });
    }
});

// Új CV link hozzáadása
router.post('/', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
    const { cv_link } = req.body;
    if (!cv_link) {
        return res.status(400).json({ error: 'CV link kötelező' });
    }

    try {
        const cvExists = await cvDao.getCv(cv_link);
        if (cvExists) {
            return res.status(409).json({ error: 'Ez a CV link már létezik' });
        }

        const success = await cvDao.insertCv(cv_link);
        if (success) {
            res.status(201).json({ message: 'CV sikeresen hozzáadva' });
        } else {
            res.status(500).json({ error: 'CV hozzáadása sikertelen' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Hiba a CV hozzáadása során' });
    }
});

// CV törlése (admin törölhet bármit, user csak a sajátját)
router.delete('/:cvLink', userAuth(['ROLE_USER', 'ROLE_ADMIN']), async (req, res) => {
    const cvLink = req.params.cvLink;
    const userEmail = req.user.email;
    const isAdmin = req.user.roles.includes('ROLE_ADMIN');

    try {
        // Ellenőrizzük, hogy a CV a felhasználóhoz tartozik-e, ha nem admin
        if (!isAdmin) {
            let connection;
            try {
                connection = await getConnection();
                const result = await connection.execute(
                    `SELECT 1 FROM allaskereso_cv_kapcsolat WHERE email = :userEmail AND cv_link = :cvLink`,
                    { userEmail, cvLink }
                );
                if (result.rows.length === 0) {
                    return res.status(403).json({ error: 'Nincs jogosultság a CV törléséhez' });
                }
            } finally {
                if (connection) await connection.close();
            }
        }

        const success = await cvDao.deleteCv(cvLink);
        if (success) {
            res.json({ message: 'CV sikeresen törölve' });
        } else {
            res.status(404).json({ error: 'CV nem található' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Hiba a CV törlése során' });
    }
});

module.exports = router;