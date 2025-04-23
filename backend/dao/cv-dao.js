const { getConnection } = require('../config/db');

class CvDao {
    // Új CV link beszúrása
    async insertCv(cvLink) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `INSERT INTO cv (cv_link) VALUES (:cvLink)`,
                { cvLink },
                { autoCommit: true }
            );
            return result.rowsAffected === 1;
        } catch (err) {
            console.error('Error inserting CV:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    // CV link lekérdezése
    async getCv(cvLink) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT cv_link FROM cv WHERE cv_link = :cvLink`,
                { cvLink }
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            console.error('Error fetching CV:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    // Összes CV link lekérdezése
    async getAllCvs() {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT cv_link FROM cv`
            );
            return result.rows;
        } catch (err) {
            console.error('Error fetching all CVs:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    // CV törlése
    async deleteCv(cvLink) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `DELETE FROM cv WHERE cv_link = :cvLink`,
                { cvLink },
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