const { executeQuery, getConnection } = require('../config/db');

class CegDao {
    // uj ceg regisztralas
    async insertCeg(ceg) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id)
                 VALUES (:ado, :name, :email, :password, :rating, :area_id)`,
                {
                    ado: ceg.id, 
                    name: ceg.name,
                    email: ceg.email,
                    password: ceg.password, //jelszot hashelni
                    rating: 0,
                    area_id: null
                },
                { autoCommit: true }
            );

            return result.rowsAffected === 1;
            
        } catch (err) {
            console.error('Error inserting ceg:', err);
            throw err;

        } finally {
            if (connection) await connection.close();
        }
    }

    async updateCeg(ceg) {
        let connection;
        try {
            connection = await getConnection();
            const fields = [];
            const binds = { taxid: ceg.taxid };

            if (ceg.neve) {
                fields.push('neve = :neve');
                binds.neve = ceg.neve;
            }
            if (ceg.email) {
                fields.push('email = :email');
                binds.email = ceg.email;
            }
            if (ceg.jelszo) {
                fields.push('jelszo = :jelszo');
                binds.jelszo = ceg.jelszo;
            }
            if (fields.length === 0) {
                throw new Error('Nincs frissítendő mező');
            }

            const query = `UPDATE ceg SET ${fields.join(', ')} WHERE adoazonosito = :taxid`;
            
            const result = await connection.execute(query, binds, { autoCommit: true });

            return result.rowsAffected === 1;
        } catch (err) {
            console.error('Error updating ceg:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }
    

    async getCegByEmail(email){
        let connection;
        try{
            connection = await getConnection();
            const query = `SELECT ADOAZONOSITO, NEVE, ERTEKELES, TERULET_ID FROM CEG
            WHERE EMAIL =: email`;
            const result = await connection.execute(query, [email]);
    
            return result.rows.length === 1 ? result.rows[0] : null;
        }catch(err){
            console.error(err);
            throw err;
        }
    }
}

module.exports = new CegDao();