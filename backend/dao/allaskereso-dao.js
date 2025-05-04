const { executeQuery, getConnection } = require('../config/db');
// const cvDao = require('../dao/cv-dao');

class AllaskeresoDao {
    // Álláskereső lekérdezése email alapján jelszó nélkül (bejelentkezéshez)
    async user(email, password, tipo) {
        let query = "";
        if(tipo === false){
            query = "SELECT email FROM allaskereso WHERE email = :email AND jelszo = :password";
        
        } else{
            query = "SELECT email FROM ceg WHERE email = :email AND jelszo = :password";
        } 
        // console.table(query);
        // console.table({email: email, password: password, tipo: tipo});

        const result = await executeQuery(query,{email: email, password: password});
        // console.table(result);
        return result.length > 0 ? result[0] : null;
    }

    // Új álláskereső regisztrálása
    async insertAllaskereso(allaskereso) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `INSERT INTO allaskereso (email, neve, jelszo, utolso_bejelentkezes, vegzettseg, statusz)
                 VALUES (:email, :name, :password, TO_TIMESTAMP(:last_signed_in, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'), :education, :status)`,
                {
                    email: allaskereso.email,
                    name: allaskereso.name,
                    password: allaskereso.password, //jelszot hashelt
                    last_signed_in: allaskereso.last_signed_in || null,
                    education: allaskereso.education || null,
                    status: allaskereso.status === 'online' ? true : false
                },
                { autoCommit: true }
            );

            return result.rowsAffected === 1;
            
        } catch (err) {
            console.error('Error inserting allaskereso:', err);
            throw err;

        } finally {
            if (connection) await connection.close();
        }
    }

    async updateAllaskereso(allaskereso) {
        let connection;
        console.table(allaskereso);
        try {
            connection = await getConnection();
            const fields = [];
            const binds = { email: allaskereso.email };
            if (allaskereso.neve != " ") {
                fields.push('neve = :neve');
                binds.neve = allaskereso.neve;
            }

            if((allaskereso.email != allaskereso.email2) || (allaskereso.email === allaskereso.email2) ){
                fields.push('email = :toemail');
                binds.email = allaskereso.email2;
                binds.toemail = allaskereso.email;
                binds.jelszo = allaskereso.jelszo;
            }

            if (allaskereso.vegzettseg) {
                fields.push('vegzettseg = :vegzettseg');
                binds.vegzettseg = allaskereso.vegzettseg;
            }

            if (allaskereso.jelszo) {
                fields.push('jelszo = :jelszo');
                binds.jelszo = allaskereso.jelszo;
            }
            if (fields.length === 0) {
                throw new Error('Nincs frissítendő mező');
            }
            
            const query = `UPDATE allaskereso SET ${fields.join(', ')} WHERE email = :email`;
            console.log(query);
            console.table(binds);
            // return;

            const result = await connection.execute(query, binds);
            await connection.execute('COMMIT');
            
            return {
                success: result.rowsAffected === 1,
                email: binds.toemail
            };
        } catch (err) {
            console.error('Error updating allaskereso:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    // Álláskereső lekérdezése email alapján, CV-kkel együtt (jelszóval admin esetén)
    async getAllaskeresoByEmail(email, includePassword = false) {
        let connection;
        try {
            connection = await getConnection();
            // const query = includePassword
            //     ? `SELECT a.email, a.neve, a.jelszo, a.utolso_bejelentkezes, a.vegzettseg, a.statusz,
            //               (SELECT LISTAGG(ac.cv_link, ',') FROM allaskereso_cv_kapcsolat ac WHERE ac.email = a.email) AS cv_links
            //        FROM allaskereso a WHERE a.email = :email`
            //     : `SELECT a.email, a.neve, a.utolso_bejelentkezes, a.vegzettseg, a.statusz,
            //               (SELECT LISTAGG(ac.cv_link, ',') FROM allaskereso_cv_kapcsolat ac WHERE ac.email = a.email) AS cv_links
            //        FROM allaskereso a WHERE a.email = :email`;
            const query = `SELECT email, neve, utolso_bejelentkezes, vegzettseg, statusz FROM ALLASKERESO
               WHERE email = :email`;
            const result = await connection.execute(query, { email });
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            console.error('Error fetching allaskereso by email:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }
    
    // Álláskereső állásra jelentkezés
    async applyForJob(binds) {
        const query = `INSERT INTO jelentkezo (allaskereso_email, allaslehetoseg_id) VALUES (:email, :jobid)`;
        const result = await executeQuery(query, binds);
        console.table(result);
        return;
        // return result.rowsAffected === 1;
    }
    
    // Utolsó bejelentkezés frissítése
    // async updateLastLogin(email) {
    //     let connection;
    //     try {
    //         // connection = await getConnection();
    //         const result = await connection.execute(
    //             `UPDATE allaskereso SET utolso_bejelentkezes = SYSDATE WHERE email = :email`,
    //             { email },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error updating last login:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

    // Álláskereső törlése (kapcsolatok automatikusan törlődnek CASCADE miatt)
    // async deleteAllaskereso(email) {
    //     let connection;
    //     try {
    //         // connection = await getConnection();
    //         const result = await connection.execute(
    //             `DELETE FROM allaskereso WHERE email = :email`,
    //             { email },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error deleting allaskereso:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }
}

module.exports = new AllaskeresoDao();