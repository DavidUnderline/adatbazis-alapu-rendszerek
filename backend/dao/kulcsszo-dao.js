const { executeQuery, getConnection } = require('../config/db');

class KulcsszoDao {
    // Kulcsszavak lekérdezése egy adott álláslehetőséghez
    async getKulcsszoByAllaslehetosegID(job_id) {
        const query =`
        SELECT KULCSSZO_NEVE FROM ALLASLEHETOSEG_KULCSSZO_KAPCSOLAT
        WHERE ALLASLEHETOSEG_ID =: job_id
        `;
        const key_words = await executeQuery(query, {job_id: job_id})
        
        return key_words;
    }

    async getKeyWords() {
        console.log("--- get categories dao---");
        const query = "select neve from kulcsszo";
        return await executeQuery(query);
    }

    async getaKeyWord(data) {
        console.log("--- get (1) keyword dao---");
        console.log(data)
        
        const query = "select neve from kulcsszo where neve = :keyword";
        return await executeQuery(query, { keyword: data });
    }

    // Új categoria beszúrása
    async insertKeyWord(data) {
        console.log("--- insert keyWord dao ---");
        console.log(data)
        const isduplicate = await this.getaKeyWord(data);
        console.log("isduplicate",isduplicate)
        if (isduplicate.length > 0) return false;
        console.log(isduplicate)

        const query = `INSERT INTO kulcsszo (neve) VALUES (:keyword)`;
        return await executeQuery(query, { keyword: data });
    }

    async keyword_job_switchboard_insert(data){
        console.log("--- keyword_job_switchboard_insert ---");
        // const a = this.getaKeyWord(data.kulcsszo_neve)
        // if (!a) return;
        const query = `INSERT INTO allaslehetoseg_kulcsszo_kapcsolat (allaslehetoseg_id, kulcsszo_neve) VALUES (:allaslehetoseg_id, :kulcsszo_neve)`;
        return await executeQuery(query, data);
    }
    // UTOLAGOSAN MODOSITJUK A KULCSSZO TABLAT. 
    // NEM TUDOM EZT BIZTOSAN AKARJUK E, ELVEGRE AKKOR MINDEN ALKALLOMMAL LENNE LEHETOSEG UJ KULCSSZO IRASARA

    // // Kulcsszó hozzárendelése álláslehetőséghez (kapcsolattábla)
    // async assignKulcsszoToAllaslehetoseg(kulcsszo) {
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `INSERT INTO allaslehetoseg_kulcsszo_kapcsolat (allaslehetoseg_id, kulcsszo_neve)
    //              VALUES (:allaslehetoseg_id, :kulcsszo_neve)`,
    //             { allaslehetoseg_id: kulcsszo.allaslehetoseg_id, kulcsszo_neve: kulcsszo.neve },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error assigning kulcsszo to allaslehetoseg:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

    // // Kulcsszó eltávolítása álláslehetőségtől (kapcsolattábla)
    // async removeKulcsszoFromAllaslehetoseg(kulcsszo) {
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `DELETE FROM allaslehetoseg_kulcsszo_kapcsolat
    //              WHERE allaslehetoseg_id = :allaslehetoseg_id AND kulcsszo_neve = :kulcsszo_neve`,
    //             { allaslehetoseg_id: kulcsszo.allaslehetoseg_id, kulcsszo_neve: kulcsszo.neve },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error removing kulcsszo from allaslehetoseg:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

    // Kulcsszó törlése
    // async deleteKulcsszo(kulcsszo) {
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `DELETE FROM kulcsszo WHERE neve = :neve`,
    //             { neve: kulcsszo.neve },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error deleting kulcsszo:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }
}

module.exports = new KulcsszoDao();