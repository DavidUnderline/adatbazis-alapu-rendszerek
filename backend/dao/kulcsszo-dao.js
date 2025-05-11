const { executeQuery, getConnection } = require('../config/db');

class KulcsszoDao {
    async getkeywords() {
        console.log("--- get keywords dao---");

        const query = "select neve from kulcsszo";
        const result = await executeQuery(query);
        // console.log(result);

        return result;
    }

    async getkeyword(data) {
        console.log("--- get (1) keyword dao---");
        const query = "select neve from kulcsszo where neve = :keyword";
        return await executeQuery(query, { keyword: data.keyword });
    }

    // Új kulcsszó beszúrása
    async insertkeyword(data) {
        console.log("--- insert keyword dao ---");
        // console.log(data);
        // return 0;

        const isduplicate = await this.getkeyword(data);
        if (isduplicate.length > 0) return false;

        const query = `INSERT INTO kulcsszo (neve) VALUES (:keyword)`;
        
        return await executeQuery(query, { keyword: data.keyword });
    }
    
    // //kapcstablaba inster
    // const kapcsolatResult = await connection.execute(
    //     `INSERT INTO allaslehetoseg_kulcsszo_kapcsolat (allaslehetoseg_id, kulcsszo_neve) VALUES (:allaslehetoseg_id, :neve)`,
    //     { neve: kulcsszo.neve, allaslehetoseg_id: kulcsszo.allaslehetoseg_id },
    //     { autoCommit: false }
    // );

    // Kulcsszavak lekérdezése egy adott álláslehetőséghez
    async getKulcsszoByAllaslehetosegId(kulcsszo) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT k.* FROM kulcsszo k
                 INNER JOIN allaslehetoseg_kulcsszo_kapcsolat akk
                 ON k.neve = akk.kulcsszo_neve
                 WHERE akk.allaslehetoseg_id = :allaslehetoseg_id`,
                { allaslehetoseg_id: kulcsszo.allaslehetoseg_id }
            );
            return result.rows;
        } catch (err) {
            console.error('Error fetching kulcsszo by allaslehetoseg_id:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
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