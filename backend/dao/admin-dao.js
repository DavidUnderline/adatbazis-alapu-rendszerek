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

  async updateAdmin(data){
    // console.table(data);
    // console.log(data.originalemail);
    console.log("--- update admin dao ---");
    const fields = [];
    const binds = { email: data.originalemail };

    if(data.email){
      binds.email = data.originalemail;
      binds.toemail = data.email;
      fields.push('email = :toemail');
    }

    if(data.name.length){
      fields.push('neve = :name');
      binds.name = data.name;
    }

    if(data.password.length){
      fields.push('jelszo = :password');
      binds.password = data.password;
    }

    const query = "UPDATE MODERATOR SET "+fields.join(', ')+" WHERE email = :email";
    // console.table(binds)
    // console.log(query);

    const res = await executeQuery(query, binds);
    // await connection.execute('COMMIT');
    
    return {
        success: res === 1,
        email: binds.toemail ? binds.toemail : binds.email
    };
  }

}



module.exports = new AdminDao