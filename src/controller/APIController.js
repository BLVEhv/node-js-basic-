import pool from './../configs/connectDB';


let getAllUser = (req, res) => {
    return res.status(200).json({
        message: 'ok'
    });
};

let getCreateUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing required params'
        });
    }
    await pool.execute('insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)', [firstName, lastName, email, address]);
    return res.status(200).json({
        message: 'ok'
    });
};

let getUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params'
        });
    }
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);
    return res.status(200).json({
        message: 'ok'
    });
};

let getDeleteUser = async (req, res) => {
    let userId = req.params.userId;
    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        });
    }
    await pool.execute('delete from users where id = ?', [userId]);
    return res.status(200).json({
        message: 'ok'
    });
};

module.exports = {
    getAllUser, getCreateUser, getUpdateUser, getDeleteUser
};