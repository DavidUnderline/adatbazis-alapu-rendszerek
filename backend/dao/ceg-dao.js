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
                    password: ceg.password,
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
        // console.log(ceg);

        try {
            connection = await getConnection();

            const fields = [];
            const binds = {
                email: ceg.email
            };

            if(ceg.adoazonosito){
                fields.push('adoazonosito = :adoazonosito');
                binds.adoazonosito = ceg.adoazonosito;
            }

            if (ceg.nev) {
                fields.push('neve = :neve');
                binds.neve = ceg.nev;
            }
            
            if (ceg.jelszo) {
                fields.push('jelszo = :jelszo');
                binds.jelszo = ceg.jelszo;
            }

            if (ceg.originalemail) {
                fields.push('email = :toemail');
                binds.email = ceg.originalemail;
                binds.toemail = ceg.email;
                binds.jelszo = ceg.jelszo;
            }

            
            if (fields.length === 0) {
                throw new Error('Nincs frissítendő mező');
            }

            const query = `UPDATE ceg SET ${fields.join(', ')} WHERE email = :email`;
            // console.log("--- QUERY: \n", query);
            // console.log("--- BINDS: \n");
            // console.table(binds);
            // return;

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

    async getCegByAdo(adoazonosito){
        // console.log(adoazonosito)
        // return;
        let connection;
        try{
            connection = await getConnection();
            const query = 'SELECT neve FROM CEG WHERE ADOAZONOSITO = :adoazonosito';
            const name = await connection.execute(query, {adoazonosito: adoazonosito});

            return name.rows[0][0];
        }catch(err){
            console.log("\n\n--- Nincs a munkához rendelve cég (adóazonosító) ---\n\n", err);
        }
    }
}

module.exports = new CegDao();