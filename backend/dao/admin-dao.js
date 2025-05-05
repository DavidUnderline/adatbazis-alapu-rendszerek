const { executeQuery, getConnection } = require('../config/db');

class AdminDao {
  async user(email, password){
    
    let connection;
    try{
      connection = await getConnection();
      let query= "SELECT email FROM allaskereso WHERE email = :email AND jelszo = :password";

      const result = await connection.execute(query, {email: email, password: password}, {autoCommit: true});
      return result.rows.length === 1
    }catch(err){}
      console.error('Error looking up admin: '+err);
      throw err;
  }
}

module.exports = new AdminDao