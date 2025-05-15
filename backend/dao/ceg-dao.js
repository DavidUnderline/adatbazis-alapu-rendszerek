const { executeQuery, getConnection } = require('../config/db');
const oracledb = require('oracledb'); // oracledb modult

class CegDao {
    // uj ceg regisztralas
    async insertCeg(ceg) {
        console.log("---[ insertCeg ]---");
        let connection;
        try {
            console.log(ceg)
            connection = await getConnection();

            if (await this.getCegByEmail(ceg.email) != null) return false;

            const result = await connection.execute(
            `
            BEGIN
                :retval := insert_ceg_func(:ado, :name, :email, :password, :rating);
            END;
            `,
            {
                ado: ceg.id,
                name: ceg.name,
                email: ceg.email,
                password: ceg.password,
                rating: 0,
                retval: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            },
            { autoCommit: true }
            
            );

            // A fgv return erteke alapjan ertekelunk
            return result.outBinds.retval === 1;

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

            if (ceg.adoazonosito) {
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


    async getCegByEmail(email) {
        console.log("---[ getCegByEmail ]---");

        let connection;
        try {
            connection = await getConnection();
            const query = `SELECT ADOAZONOSITO, NEVE, ERTEKELES, TERULET_ID FROM CEG WHERE EMAIL = :email`;
            const result = await connection.execute(query, { email: email });

            return result.rows.length === 1 ? result.rows[0] : null;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getCegByAdo(adoazonosito) {
        // console.log(adoazonosito)
        // return;
        let connection;
        try {
            connection = await getConnection();
            const query = 'SELECT neve FROM CEG WHERE ADOAZONOSITO = :adoazonosito';
            const name = await connection.execute(query, { adoazonosito: adoazonosito });

            return name.rows[0][0];
        } catch (err) {
            console.log("\n\n--- Nincs a munkához rendelve cég (adóazonosító) ---\n\n", err);
        }
    }

    async setCegErtekeles(rating, user_email, ceg_ado) {
        const query = `
        INSERT INTO CEGERTEKELES (ERTEKELES, CEG_ADOAZONOSITO, ALLASKERESO_EMAIL) 
        VALUES (:rating, :ceg_ado, :user_email)
        `;
        try {

            const res = await executeQuery(query, { rating: rating, ceg_ado: ceg_ado, user_email: user_email });

            return res;
        } catch (err) {
            if (err.errorNum == 1)
                console.error("Már Értékelted a céget.")
            else
                console.error(err);
        }
    }


    async getCegErtekeles(ceg_ado, user_email) {
        const binds = { ceg_ado: ceg_ado }
        let query = ''
        if (!user_email) {
            query = `
                SELECT ERTEKELES FROM CEG
                WHERE ADOAZONOSITO =: ceg_ado`;
        } else {
            query = `
                SELECT ERTEKELES FROM CEGERTEKELES
                WHERE CEG_ADOAZONOSITO =: ceg_ado AND ALLASKERESO_EMAIL =: user_email`;
                binds.user_email = user_email;
        }
        console.log(query, binds)
        try {
            const res = await executeQuery(query, binds)
            return res;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new CegDao();