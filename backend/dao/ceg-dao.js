const { executeQuery, getConnection } = require('../config/db');

class CegDao {
    // uj ceg regisztralas
    async insertCeg(ceg) {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id)
                 VALUES (:ado, :name, :email, :password, :rating, :area_id)`,
                {
                    ado: ceg.id, 
                    name: ceg.name,
                    email: ceg.email,
                    password: ceg.password, //jelszot hashelni
                    rating: 0,
                    area_id: null
                },
                { autoCommit: true }
            );

            return result.rowsAffected === 1;
            
        } catch (err) {
            console.error('Error inserting ceg:', err);
            throw err;

        } finally {
            if (connection) await connection.close();
        }
    }
}

module.exports = new CegDao();