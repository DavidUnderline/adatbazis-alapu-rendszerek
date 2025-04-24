const { executeQuery, getConnection } = require('../config/db');

class AllaskeresoDao {
    // Álláskereső lekérdezése email alapján jelszó nélkül (bejelentkezéshez)
    async user(email, tipo) {
        let query = "";
        if(tipo === false){
            query = "SELECT email FROM allaskereso WHERE email = :email";
        
        } else{
            query = "SELECT email FROM ceg WHERE email = :email";
        } 

        const result = await executeQuery(query,[email]);
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
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `UPDATE allaskereso 
                 SET neve = :name, jelszo= :password, vegzettseg = :education
                 WHERE email = :email`,
                {
                    email: allaskereso.email,
                    name: allaskereso.name,
                    education: allaskereso.education || null,
                    password: allaskereso.password
                },
                { autoCommit: true }
            );
            return result.rowsAffected === 1;
        } catch (err) {
            console.error('Error updating allaskereso:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    // egy CV hozzárendelése egy álláskeresőhöz
    // async addCvToAllaskereso(email, cvLink) {
    //     let connection;
    //     try {
    //         // connection = await getConnection();
    //         const result = await connection.execute(
    //             `INSERT INTO allaskereso_cv_kapcsolat (email, cv_link) VALUES (:email, :cvLink)`,
    //             { email, cvLink },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error adding CV to allaskereso:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

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
            const query = `SELECT email, neve, utolso_bejelentkezes, vegzettseg, statusz, cv_link FROM ALLASKERESO
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

    // Összes álláskereső lekérdezése, CV-kkel együtt (jelszóval admin esetén)
    // async getAllAllaskeresok() {
    //     let connection;
    //     try {
    //         // connection = await getConnection();
    //         const result = await connection.execute(
    //             `SELECT a.email, a.neve, a.jelszo, a.utolso_bejelentkezes, a.vegzettseg, a.statusz,
    //                     (SELECT LISTAGG(ac.cv_link, ',') FROM allaskereso_cv_kapcsolat ac WHERE ac.email = a.email) AS cv_links
    //              FROM allaskereso a`
    //         );
    //         return result.rows;
    //     } catch (err) {
    //         console.error('Error fetching all allaskeresok:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

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

    // Jelszó módosítása
    // async updatePassword(email, hashedPassword) {
    //     let connection;
    //     try {
    //         // connection = await getConnection();
    //         const result = await connection.execute(
    //             `UPDATE allaskereso SET jelszo = :hashedPassword WHERE email = :email`,
    //             { hashedPassword, email },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error updating password:', err);
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

    // CV kapcsolat törlése egy álláskeresőtől
    // // CV torlodik, amikor a kapcsolatot toroljuk --> on delete-ek beallitasa szukseges
    // async deleteCvFromAllaskereso(email, cvLink) {
    //     let connection;
    //     try {
    //         // connection = await getConnection();
    //         const result = await connection.execute(
    //             `DELETE FROM allaskereso_cv_kapcsolat WHERE email = :email AND cv_link = :cvLink`,
    //             { email, cvLink },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error deleting CV from allaskereso:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }
}

module.exports = new AllaskeresoDao();