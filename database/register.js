var pool = require('../config/db_con.js');

// ====== This Function Will Check Duplication of E-Mail ID and Password ====== //

async function check_data(data) {
    return new Promise(function (resolve, reject) {
        var sql;
        sql = "SELECT  `userName`, `email` FROM `user` WHERE `userName` = ? OR `email` = ?";
        pool.query(sql, [data.username, data.email], (err, result) => {
            if (err) {
                throw err;
            } else {

                if (result.length > 0) {
    
                    if (result[0].userName.length >= 0 && result[0].userName == data.username) {
                        resolve("User Name Already Exists");
                    } else if( result[0].email.length >= 0 && result[0].email == data.email) {
                        resolve("Email Already Exists");
                    } 
                } else {
                    resolve("True");
                }
            }
        });
    });
}

// ====== This Function will insert a new row into the database ====== //
function signup_form_user(query_data) {
    var sql = " INSERT INTO `user`(`userName`, `email`, `passwordHash`, `admin`, `vendor`, `registeredAt`) VALUES (?)";

    pool.query(sql, [query_data], function (err, result) {
        if (err) {
            throw err;
        } else {
            return "New User Inserted Successfully";
        }
    });
}

module.exports = {
    signup_form_user,
    check_data
}