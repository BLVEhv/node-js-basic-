import pool from './../configs/connectDB';
import multer from 'multer';

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

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)', [firstName, lastName, email, address]);
    return res.redirect('/');
};

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId]);
    return res.redirect('/');
};

let getUpdateUser = async (req, res) => {
    let id = req.params.userId;
    let [user] = await pool.execute(`select * from users where id = ?`, [id]);
    return res.render('update.ejs', { dataUser: user[0] });
};

let getEditUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);
    return res.redirect('/');
};

let getUploadFile = async (req, res) => {
    return res.render('uploadFile.ejs');
};

const upload = multer().single('profile_pic');

let getUploadHandle = async (req, res) => {

    // 'profile_pic' is the name of our file input field in the HTML form

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
};

module.exports = {
    getHomePage, getUserPage, createNewUser, deleteUser, getUpdateUser, getEditUser, getUploadFile, getUploadHandle
};