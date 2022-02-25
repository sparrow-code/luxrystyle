const { signup_form_user, check_data } = require("../database/register.js")
const { decrypt, encrypt } = require("../config/enc_dec.js");

const getRegister = function (req, res, next) {

    res.render('register', {});
}

const postRegister = function (req, res, next) {

    let date = new Date(),
    current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    let req_data = [
        req.body.username,
        req.body.email,
        JSON.stringify(encrypt(req.body.password)),
        "user",
        false,
        current_date + " " + current_time
    ];

    let reqData = {
        username: req.body.userName,
        email: req.body.eMail
    }

    check_data(reqData).then( 
        (value) => {

            console.log( "Line 33 : " + value);

            // console.log(" Line 26 : " +  signup_form_user(req_data));

        },
        (error) => {
            console.log(error);
        }
    );

    // res.redirect('/verify');
}

const checkSignup = function(req, res, next) {

    let reqData = {
        username: req.body.userName,
        email: req.body.eMail
    }

    check_data(reqData).then( 
        (value) => {
            console.log("Controller : Line 55 : " + value);
            res.send(value);
        },
        (error) => {
            console.log(error);
        }
    );
    
}

const putRegister = function (req, res, next) {

    /* 
        const password = "Hello";
        const encrypted_password = encrypt(password);
    
        console.log(encrypted_password);
     */

    /* 
    { iv: 'cf99111fb500081aa18961bec3a6159d', content: 'e621c52a4b' }
    Line 26 : Hello
    */


    let encrypted_password = {
        iv: 'cf99111fb500081aa18961bec3a6159d',
        content: 'e621c52a4b'
    }

    console.log(encrypted_password);


    const decrypt_password = decrypt(encrypted_password);
    console.log("Line 26 :" + decrypt_password);
}

const deleteRegister = function (req, res, next) {
    res.redirect('/register');
}

module.exports = {
    checkSignup,
    getRegister,
    postRegister,
    putRegister,
    deleteRegister
}