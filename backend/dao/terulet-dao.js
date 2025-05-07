const { executeQuery, getConnection } = require('../config/db');

class TeruletDao {
    // Új terület beszúrása
    async insertTerulet(terulet) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `INSERT INTO terulet (orszag, megye, varos) VALUES (:orszag, :megye, :varos)`,
                { orszag: terulet.orszag, megye: terulet.megye, varos: terulet.varos },
                { autoCommit: true }
            );
            return result.rowsAffected === 1;
        } catch (err) {
            console.error('Error inserting terulet:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    // Terület lekérdezése ID alapján
    async getTeruletById(id) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT * FROM terulet WHERE id = :id`,
                { id }
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            console.error('Error fetching terulet by id:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    // // Összes terület lekérdezése
    // async getAllTerulet() {
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `SELECT * FROM terulet`
    //         );
    //         return result.rows;
    //     } catch (err) {
    //         console.error('Error fetching all terulet:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

    // Terület frissítése
    async updateTerulet(terulet) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `UPDATE terulet SET orszag = :orszag, megye = :megye, varos = :varos WHERE id = :id`,
                { orszag: terulet.orszag, megye: terulet.megye, varos: terulet.varos, id: terulet.id },
                { autoCommit: true }
            );
            return result.rowsAffected === 1;
        } catch (err) {
            console.error('Error updating terulet:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    // Terület törlése
    async deleteTerulet(id) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `DELETE FROM terulet WHERE id = :id`,
                { id },
                { autoCommit: true }
            );
            return result.rowsAffected === 1;
        } catch (err) {
            console.error('Error deleting terulet:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    async getvarosok() {
        const query = 'select varos from terulet';
        // console.log("inside terulet dao");

        const result = await executeQuery(query, {});
        console.log(result);
        return result;
    }

    async getVarosById(id){
        const query = 'SELECT VAROS FROM TERULET WHERE ID =: id';
        
        try{
            const city = await executeQuery(query, {id: id});
            // console.log("\t\tgetVarosById: ", city[0].VAROS);
            
            return city[0].VAROS;
        }catch(err){
            console.error(err);
            throw err;
        }
    }
}

module.exports = new TeruletDao();