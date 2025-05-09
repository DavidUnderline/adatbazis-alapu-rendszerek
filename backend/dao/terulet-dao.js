const { executeQuery, getConnection } = require('../config/db');

class TeruletDao {
    // Új terület beszúrása
    async insertTerulet(terulet) {
        console.log("--- inside terulet dao ---");
        let connection;
        try {
            connection = await getConnection();

            const isduplicate = await connection.execute(
                `SELECT * FROM terulet WHERE orszag = :orszag AND megye = :megye AND varos = :varos`,
                { orszag: terulet.orszag, megye: terulet.megye, varos: terulet.varos },
                { autoCommit: true }
            )
            
            if (isduplicate.rows.length > 0) return false;

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
    
    // Terület törlése
    // async deleteTerulet(id) {
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `DELETE FROM terulet WHERE id = :id`,
    //             { id },
    //             { autoCommit: true }
    //         );
    //         return result.rowsAffected === 1;
    //     } catch (err) {
    //         console.error('Error deleting terulet:', err);
    //         throw err;
    //     } finally {
    //         if (connection) await connection.close();
    //     }
    // }

}

module.exports = new TeruletDao();