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

router.post('/api/getTopCeg', async (req, res) => {
  console.log("---[ getTopCeg ]---")
try{
  const result = await statisticsDao.getTopCeg();
  if(!result)
    res.json({success: false, message: "nem lehetett lekérdezni az adatokat"}) 
  
  res.json({success: true, result: result} )
}catch(err){
  res.json({success: false, message: "nem lehetett lekérdezni az adatokat"}) 
  console.error(err)
}
});

router.post('/api/getAvgFizu', async (req, res) => {
  console.log('--- getAvgFizu ---');
  try{

    const result = await statisticsDao.getAvgFizu();
    console.log(result);
    if(!result)
      res.json({success: false, message: 'nem lehetett lekérdezni az adatokat'});

    res.json({success: true, result: result});
  }catch(err){
    console.error(err);
  }});

  router.post('/api/getPopularCategories', async(req, res) => {
    console.log('--- getPopularCategories ---');
    
    try{
      const result = await statisticsDao.getPopularCategories()
      console.log("getPopularCategories",result);
      if(!result)
        res.json({success: false, message: 'nem lehetett lekérdezni az adatokat'})
      res.json({success: true, result: result});
    }catch(err){
      console.error(err);
    }
  }),








module.exports = router;