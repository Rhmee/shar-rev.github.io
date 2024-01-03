const { error } = require('console');
const pool = require('../../db');
const queries = require('./queries');

const getUser = (req, res) => {
    pool.query(queries.getUsers, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const getUserByID = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserByID, [id], (error, result) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addUser = (req, res) => {
    const {username, phone_number, password} = req.body;
    // pool.query(queries.checkNumber, [phone_number], (error, result) => {
    //     if (results.rows.length) {
    //         res.send("Дугаар дээр бүртгэл байна.")
    //     } 
    // })
    pool.query(queries.addUser, [username, phone_number, password], (error, results) => {
        if (error) throw error;
        res.status(201).send("Бүртгэл үүслээ");
    })
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    
    pool.query(queries.deleteUser, [id], (error, result) => {
        const noUserFound = !result.rows.length;

        if (!noUserFound) {
            return res.send("Хэрэглэгч олдсонгүй.");
        }

        pool.query(queries.deleteUser, [id], (error, result) => {
            res.status(200).send("Хэрэглэгчийн бүртгэл устгагдлаа.");
        });
    });
};

const updateUser = (req, res) => {
    id = parseInt(req.params.id);
    const { username } = req.body;

    pool.query(queries.getUserByID, [id], (error, result) => {
        const noUserFound = !result.rows.length;
        if (!noUserFound) {
            return res.send("Хэрэглэгч олдсонгүй.");
        }

        pool.query(queries.updateUser, [username, id], (error, result) => {
            if (error) throw error;
            res.status(200).send("Хэрэглэгчийн мэдээлэл шинэчлэгдлээ.")
        });
    });
}

module.exports = {
    getUser,
    getUserByID,
    addUser,
    deleteUser,
    updateUser,
};
