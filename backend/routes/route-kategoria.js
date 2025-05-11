const express = require('express');
const router = express.Router();
const kategoriaDao = require('../dao/kategoria-dao');

// Kulcsszó beszúrása
router.post('/api/addcategory', async (req, res) => {
    // console.log(req.body);
    // return;

    const categories = req.body;

    try {
        const success = await kategoriaDao.insertcategory(categories);
        if (!success) {
            return res.json({ success: false, message: 'Létező kategória!' });
        }

        return res.json({ success: true, message: 'Kategória sikeresen hozzáadva!' });

    } catch (err) {
        return res.json({ success: false, message: 'Hiba a kategória beszúrása során!' });
    }
});

// categoriak lekérdezése
router.get('/api/getcategories', async (req, res) => {
    console.log('--- get categories route ---');
    // console.log(req.body)

    try {
        const keywords = await kategoriaDao.getcategories();
        // console.log(keywords);

        if (keywords.length === 0) {
            res.json({ success: false, message: 'Nincs kategória az adatbázisban' });
            return;
        }

        return res.json({ success: true, keywords: keywords });
    } catch (err) {
        res.json({ error: 'Hiba a kategória lekérdezése során' });
    }
});

// // Kategória beszúrása
// router.post('/api/Kategoriainsert', async (req, res) => {
//     const kategoria = req.body;
//     try {
//         // kategoria-ban jon kategorianev meg allaslehetoseg_id
//         const success = await kategoriaDao.insertKategoria(kategoria);
//         if (!success) {
//             res.json({ success: false, message: 'Kategória beszúrása sikertelen' });
//             return;
//         }
//         res.json({ success: true, message: 'Kategória sikeresen beszúrva' });
//     } catch (err) {
//         res.status(500).json({ error: 'Hiba a kategória beszúrása során' });
//     }
// });

// // Kategória lekérdezése név alapján
// router.post('/api/getByNev', async (req, res) => {
//     const kategoria = req.body;
//     try {
//         const result = await kategoriaDao.getKategoriaByNev(kategoria);
//         if (!result) {
//             res.json({ success: false, message: 'Kategória nem található' });
//             return;
//         }
//         res.json({ success: true, kategoria: result });
//     } catch (err) {
//         res.status(500).json({ error: 'Hiba a kategória lekérdezése során' });
//     }
// });

// // Kategóriák lekérdezése álláslehetőség ID alapján
// router.post('/api/getByAllaslehetosegId', async (req, res) => {
//     const kategoria = req.body;
//     try {
//         const result = await kategoriaDao.getKategoriaByAllaslehetosegId(kategoria);
//         if (result.length === 0) {
//             res.json({ success: false, message: 'Nincs kategória ehhez az álláslehetőséghez' });
//             return;
//         }
//         res.json({ success: true, kategoriak: result });
//     } catch (err) {
//         res.status(500).json({ error: 'Hiba a kategóriák lekérdezése során' });
//     }
// });

// // Kategória törlése
// router.post('/api/delete', async (req, res) => {
//     const kategoria = req.body;
//     try {
//         const success = await kategoriaDao.deleteKategoria(kategoria);
//         if (!success) {
//             res.json({ success: false, message: 'Kategória törlése sikertelen' });
//             return;
//         }
//         res.json({ success: true, message: 'Kategória sikeresen törölve' });
//     } catch (err) {
//         res.status(500).json({ error: 'Hiba a kategória törlése során' });
//     }
// });

module.exports = router;