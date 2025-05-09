const express = require('express')
const router = express.Router();
const adminDao = require('./../dao/admin-dao')

router.post('/api/get', async (req, res) => {
  const email = req.body.email;
  try{
    const success = await adminDao.get(email);
    if (!success){
      res.json({success: false, message: "Nem található ilyen felhasználó."})
      return;
    }
    res.json({success: true,  email: success[0][0], neve: success[0][1]});
  }catch(err){
    console.error(err);
    throw err;
  }
});

router.post('/api/insert', async (req, res) => {
  console.log("\n\n---[ route-admin ]---")
  const admin_data = req.body
  console.table(admin_data)
  try{
    result = await adminDao.insert(admin_data);
    if(!result){
      res.json({success: result, message: "Nem lehet regisztrálni az új moderátort."});
      return;
    }
    res.json({success: result, message: "Sikeres regisztráció."});
  }catch(err){
    switch(err.errorNum){
      case 1: 
        res.json({success: false, message: "Ezen az emailen már létezik admin."});
        break;
      default:
         console.error(err);
        break
    }
  }
})



module.exports = router;