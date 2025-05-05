const { executeQuery, getConnection } = require('../config/db');

class AdminDao {
  async user(email, password){
    // console.log(email, password);
    let connection;
    try{
      connection = await getConnection();
      let query= "SELECT email FROM MODERATOR WHERE email = :email AND jelszo = :password";

      const result = await connection.execute(query, {email: email, password: password}, {autoCommit: true});
      return result.rows.length === 1
    }catch(err){}
      console.error('Error looking up admin: '+err);
      throw err;
  }

  async get(email){
    console.log("---[ admin-dao.get ]---")
    let connection
    try{
      connection = await getConnection();
      let query = "SELECT email, neve FROM MODERATOR WHERE email =: email";
      const result = await connection.execute(query, {email: email});
      // console.log(result);
      return result.rows;
    }catch(err){

    }
  }
}

module.exports = new AdminDao