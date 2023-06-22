const express = require('express')
const router = express.Router()

const {register, login} = require('../controllers/auth')
const checkAuthentication = require('../middleware/authentication')

router.post('/register', register);
router.route('/login').post(login);

module.exports = router