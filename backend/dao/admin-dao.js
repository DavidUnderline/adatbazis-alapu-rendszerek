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
    let connection
    try{
      connection = await getConnection();
      const query = "SELECT email, neve FROM MODERATOR WHERE email =: email";
      const result = await connection.execute(query, {email: email});
      // console.log(result);
      return result.rows;
    }catch(err){
      console.error("Error getting admins attributes: "+err);
      throw err;
    }
  }

  async insert(data){
    console.log("---[ admin-dao.insert ]---")
    console.log(data)
    let connection
    try{
      connection = await getConnection();
      const query = 'INSERT INTO moderator (email,neve, jelszo) VALUES (:email, :neve, :jelszo)';
      let result = await connection.execute(query, {
        email:data.email,
        neve:data.name,
        jelszo:data.password
      }, {autoCommit: true});
      return result.rowsAffected == 1;
    }catch(error){
      console.error(error);
      throw error;
    }
  }

}



module.exports = new AdminDao