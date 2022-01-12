const router = require('express').Router();

const addUserController = require('../Components/User');

router.post('/register', addUserController.userReg );
router.post('/login', addUserController.userLogin);

module.exports= router;