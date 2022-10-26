import pool from './../configs/connectDB';

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    console.log(rows);
    return res.render('index.ejs', { dataUser: rows });
};

let getUserPage = async (req, res) => {
    let id = req.params.userId;
    let [user] = await pool.execute(`select * from users where id = ?`, [id]);
    return res.send(JSON.stringify(user));
};

module.exports = {
    getHomePage, getUserPage
};