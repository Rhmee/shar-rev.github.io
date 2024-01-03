const getUsers = 'SELECT * FROM "Users"';
const getUserByID = 'select * from "Users" where user_id = $1';
const addUser = 'INSERT INTO "Users" (username, phone_number, password) VALUES ($1, $2, $3) RETURNING user_id';
const deleteUser = 'DELETE FROM "Users" WHERE user_id = $1';
const updateUser = 'UPDATE "Users" SET username = $1 WHERE user_id = $2' ;

module.exports = {
    getUsers,
    getUserByID,
    addUser,
    deleteUser,
    updateUser,
};