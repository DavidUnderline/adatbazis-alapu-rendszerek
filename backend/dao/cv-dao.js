const { executeQuery, getConnection } = require('../config/db');

class CvDao {
    // Új CV link beszúrása
    async insertCv(cv) {
        let connection;
        try {
            connection = await getConnection();

            //Cv beszuraas tablaba
            console.table(cv);
            const result = await connection.execute(
                `INSERT INTO cv (cv_link, allaskereso_email) VALUES (:cv_link, :email)`,
                { cv_link: cv.cv_link, 
                    email: cv.email
                },
                { autoCommit: false }
                
            );
            if (result.rowsAffected != 1) {
                throw new Error('CV beszúrása sikertelen');
            }            

            await connection.commit();
            return true;
        } catch (err) {
            if (connection) await connection.rollback();
            console.error('\n\nError inserting CV:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    // CV link lekérdezése
    async getCv( email ) {
        let connection;
        try {

            connection = await getConnection();
            console.log("\n\n"+email+"\n\n")
            const result = await connection.execute(
                `SELECT cv_link FROM cv WHERE allaskereso_email = :email`,
                { email: email }
            );

            return result.rows.length > 0 ? result.rows : null;

        } catch (err) {
            console.error('Error fetching CV:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    // CV törlése
    async deleteCv(cv_link) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `DELETE FROM cv WHERE cv_link = :cv_link`,
                { cv_link },
                { autoCommit: true }
            );
            return result.rowsAffected === 1;
        } catch (err) {
            console.error('Error deleting CV:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new CvDao();