const express = require('express')
const router = express.Router();
const adminDao = require('./../dao/admin-dao')

router.post('/api/get', async (req, res) => {
  console.log("---[ route-admin ]---")
  const email = req.body.email;
  
  try{
    const success = await adminDao.get(email);
    console.table(success);
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



module.exports = router;