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
});

router.post('/api/updateAdmin', async(req, res)=>{
  console.log("\n\n---[ route-admin update ]---");
  const data = req.body
  console.log(data);
  try {
        const result = await adminDao.updateAdmin(data);
        // console.log("res", result);

        if (!result.success) {
           return res.json({ success : false, message: 'Sikertelen módosítás!' });
            
        }
        return res.json({ success : true, email: result.email, message: 'Sikeres módosítás!' });
        
    } catch (err) {
        return res.json({ error: 'Hiba a módosítás során!' });
    }
});

router.post('/api/delete_user', async(req, res)=>{
  console.log("\n\n---[ route-admin delete ]---");
  
  const data = req.body
  try {
        const result = await adminDao.deleteuser(data);
        console.log("res", result);

        if (!result) {
           return res.json({ success : false, message: 'Nincs ilyen felhasználó a választott körben!' });
            
        }
        
        return res.json({ success : true, email: result.email, message: 'Sikeres törlés!' });
        
    } catch (err) {
        return res.json({ error: err });
    }
});


module.exports = router;