const express = require('express');
const router = express.Router();
const jelentkezoDao =  require('../dao/jelentkezo-dao');
const allaskeresoDao = require('../dao/allaskereso-dao')

router.post('/api/getJelentkezo', async (req, res) => {
  console.log("---[ getJelentkezo ]---");
  const  job_id  = req.body.job_id;
  console.log(job_id);
  try{
    
    const applicant_email = await jelentkezoDao.getJelentkezokByJobId(job_id);
    console.table(applicant_email);

    if(applicant_email === undefined){
      res.json({success: false, message: ""})
      return;
    }

    res.json({success: true, message: "", applicants: applicant_email})
  
  }catch(err){
    res.json({success: false, message: err.error})
    console.log(err)
  }});


module.exports = router;