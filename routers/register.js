var express = require('express');
var router = express.Router();

const { checkSignup,
    getRegister,
    postRegister,
    putRegister,
    deleteRegister
} = require('../controllers/register.js');

router.get('/', getRegister);

router.post('/', postRegister);

router.post('/chekSignup', checkSignup);

router.put('/', putRegister);

router.delete('/', deleteRegister);

module.exports = router;