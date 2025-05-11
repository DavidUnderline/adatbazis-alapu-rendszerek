const { executeQuery, getConnection } = require('../config/db');

class KategoriaDao {
    async getcategories() {
        console.log("--- get categories dao---");
        const query = "select neve from kategoria";
        return await executeQuery(query);
    }

    async getcategory(data) {
        console.log("--- get (1) category dao---");
        const query = "select neve from kategoria where neve = :keyword";
        return await executeQuery(query, { keyword: data.keyword });
    }

    // Új categoria beszúrása
    async insertcategory(data) {
        console.log("--- insert category dao ---");

        const isduplicate = await this.getcategory(data);
        if (isduplicate.length > 0) return false;
        console.log(isduplicate)

        const query = `INSERT INTO kategoria (neve) VALUES (:keyword)`;
        return await executeQuery(query, { keyword: data.keyword });
    }

    // // Új kategória beszúrása
    // async insertKategoria(kategoria) {
    //     // kategoria-ban jon kategorianev meg allaslehetoseg_id
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `INSERT INTO kategoria (neve, allaslehetoseg_id) VALUES (:neve, :allaslehetoseg_id)`,
    //             { neve: kategoria.neve, allaslehetoseg_id: kategoria.allaslehetoseg_id },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error inserting kategoria:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

    // // Kategória lekérdezése név alapján
    // async getKategoriaByNev(kategoria) {
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `SELECT * FROM kategoria WHERE neve = :neve`,
    //             { neve: kategoria.neve },
    //             { autoCommit: true }
    //         );
    //         return result.rows.length > 0 ? result.rows[0] : null;
    //     } catch (err) {
    //         console.error('Error fetching kategoria by neve:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

    // // Kategóriák lekérdezése egy adott álláslehetőséghez
    // async getKategoriaByAllaslehetosegId(kategoria) {
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `SELECT * FROM kategoria WHERE allaslehetoseg_id = :allaslehetoseg_id`,
    //             { allaslehetoseg_id: kategoria.allaslehetoseg_id }
    //         );
    //         return result.rows;
    //     } catch (err) {
    //         console.error('Error fetching kategoria by allaslehetoseg_id:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

    // // Kategória frissítése
    // async updateKategoria(kategoria) {
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `UPDATE kategoria SET allaslehetoseg_id = :allaslehetoseg_id WHERE neve = :neve`,
    //             { allaslehetoseg_id: kategoria.allaslehetoseg_id, neve: kategoria.neve },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error updating kategoria:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

    // Kategória törlése
    // async deleteKategoria(kategoria) {
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `DELETE FROM kategoria WHERE neve = :neve`,
    //             { neve: kategoria.neve },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error deleting kategoria:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }
}

module.exports = new KategoriaDao();