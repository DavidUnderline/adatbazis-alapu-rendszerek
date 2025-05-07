const { autoCommit } = require('oracledb');
const { executeQuery, getConnection } = require('../config/db');

class JelentkezoDao{

  async getJelentkezokByJobId(job_id){
    // console.log("---[ getJelentkezokByJobId ]---");    
    let conn;
    // console.log('query:', "select ALLASKERESO_EMAIL from JELENTKEZO WHERE ALLASLEHETOSEG_ID =", job_id);
    const query = ' select ALLASKERESO_EMAIL from JELENTKEZO WHERE ALLASLEHETOSEG_ID =: job_id';
    try{
      conn = await getConnection();
      const applicant_emails = await conn.execute(query, [job_id], {autoCommit: true});
      
      return applicant_emails.rows;
    }catch(err){
      throw err;
    }


  }

}

module.exports = new JelentkezoDao;