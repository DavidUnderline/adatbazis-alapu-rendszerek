const express = require('express');
const statisticsDao = require('../dao/statistics-dao');
const router = express.Router();


router.post('/api/munkaEroHiany', async (req, res) => {
  console.log("---[ munkaEroHiany ]---")
  try{
    const result = await statisticsDao.megyenkentiAllasokSzama();
    console.table(result);
    if(!result){
      res.json({success: false, message: "nem lehetett lekérdezni az adatokat"});
    }
    res.json({ success: true, result:result});
  }catch(err){
    console.error(err);
  }
})






module.exports = router;