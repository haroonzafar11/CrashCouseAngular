const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authentication.controller');

router.post('/createUser', authenticationController.createUser);
router.post('/signIn', authenticationController.signIn);

module.exports = router;